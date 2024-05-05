import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import {
  getUserByEmail,
  getUserById,
  getUserByUsername,
  registerUser,
  resetPasswordById,
} from '../services/auth.services.js';
import { generateHashedPassword } from '../utilities/hash.js';
import { sendPasswordResetMail } from '../utilities/sendMail.js';
import {
  signAccessToken,
  signRefreshToken,
  signResetPasswordToken,
  verifyResetPasswordToken,
} from '../utilities/jwt.js';
import { ROLES_LIST } from '../config/roles_list.js';

dotenv.config();

// ------------  Sign Up ---------------
// @route POST /auth/signup
// @access Public
export const signUpUser = async (request, response, next) => {
  const { username, email, classInfo, password } = request.body;

  try {
    // check username in db
    const usernameInDB = await getUserByUsername(username);
    if (usernameInDB) throw createError.Conflict(`Username not available`);

    // check email in db
    const userEmailInDB = await getUserByEmail(email);
    if (userEmailInDB)
      throw createError.Conflict(`${email} has already been registered`);

    // hashing password
    const hashedPassword = await generateHashedPassword(password);
    if (!hashedPassword) throw createError.InternalServerError();
    // Default Roles and class assigned to users
    const defaultAccess = {
      classAssigned: [classInfo],
      role: ROLES_LIST.Student,
    };

    // register userDetails into database
    const result = await registerUser({
      username: username,
      email: email,
      password: hashedPassword,
      dashboardAccess: false,
      access: defaultAccess,
    });
    if (!result) throw createError.InternalServerError();
    else
      response.send({
        message: 'User Registration successfull!! Await Authorization by Admin',
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// -------------- Login ----------------
// @route POST /auth/login
// @access Public
export const loginUser = async (request, response, next) => {
  const { email, password } = request.body;

  try {
    // email check
    const user = await getUserByEmail(email);
    if (!user) throw createError.NotFound('Invalid credentials');

    //password check
    const storedDBPassword = user.password;
    const isPasswordMatch = await bcrypt.compare(password, storedDBPassword);
    if (!isPasswordMatch) throw createError.NotFound('Invalid credentials');

    // for allowing or restricting users access
    const dashboardAccess = user.dashboardAccess;

    // checking if account is verified
    if (!dashboardAccess)
      throw createError.Unauthorized(
        'Account pending verification. Please contact your teacher'
      );

    // for generating tokens
    const username = user.username;
    // Allowed access parameters
    const access = user.access;

    // generating access token
    const accessToken = await signAccessToken(access, username);

    //generating access token
    const refreshToken = await signRefreshToken(username);
    if (refreshToken) {
      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }
    if (accessToken && refreshToken)
      response.send({
        accessToken: accessToken,
      });
    else createError.InternalServerError();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// -------------- Refresh Access ----------------
// @route POST /auth/login
// @access Public
export const refreshUser = async (request, response, next) => {
  const cookies = request.cookies;
  try {
    // retrieve refresh Token
    const refreshToken = cookies.refreshToken;
    if (!refreshToken) throw createError.Unauthorized();

    // issuing Access Token
    const secret = "capvu";
    jwt.verify(refreshToken, secret, async (error, decoded) => {
      try {
        if (error) throw createError.Forbidden();
        const name = decoded.username;
        const user = await getUserByUsername(name);

        const username = user.username;
        const access = user.access;
        const accessToken = await signAccessToken(access, username);
        if (accessToken) {
          response.send({ accessToken: accessToken });
        } else createError.InternalServerError();
      } catch (error) {
        console.log(error);
        next(error);
      }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// ------------ Forgot Password -------------------
//Forgot Password gets email from the req.body and
// confirms if the email is registered or not and sends the reset email link to the user
export const forgotUserPassword = async (request, response, next) => {
  const { email } = request.body;

  try {
    // email check
    const user = await getUserByEmail(email);
    if (!user) throw createError.NotFound('User does not exist');

    const _id = user._id; // id
    const storedDBPassword = user.password; // password

    // sign token
    const token = await signResetPasswordToken(email, storedDBPassword);
    if (!token) throw createError.InternalServerError();

    // send reset email
    const sendMail = await sendPasswordResetMail(email, _id, token);
    if (sendMail) {
      response.send({
        message: `Password reset mail has been sent successfully to ${email}. Kindly check your spam folder also.`,
      });
    } else {
      throw createError.UnprocessableEntity();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// ---------------- Reset password -----------
// For resetting Password by using the link provided through email
// Checks for if user exists with the id in link and if exists validates onetime token
// ot token expires with change of password
export const resetUserPassword = async (request, response, next) => {
  const { _id, token } = request.params;
  const { password } = request.body;
  try {
    // link verification using _id in params
    const user = await getUserById(_id); //to find by _id
    if (!user) throw createError.Conflict('Invalid link');

    //jwt verification
    const storedDBPassword = user.password;
    const isVerified = await verifyResetPasswordToken(token, storedDBPassword);
    if (!isVerified) throw createError.Conflict('Invalid link');

    //hashing the password provided
    const hashedPassword = await generateHashedPassword(password);
    // updating the new password
    const updatedResult = await resetPasswordById({
      _id,
      password: hashedPassword,
    });
    if (updatedResult) {
      response.send({ message: 'Reset password successfull.Please Login.' });
    } else {
      throw createError.InternalServerError();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
