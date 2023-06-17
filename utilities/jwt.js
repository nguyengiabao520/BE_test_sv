import jwt from 'jsonwebtoken';

export const signVerifyAccountToken = async (email) => {
  const payload = {
    email: email,
  };
  const secret = process.env.VERIFY_ACCOUNT_TOKEN_SECRET;

  try {
    const token = jwt.sign(payload, secret);
    return token;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const signAccessToken = async (access, username) => {
  const payload = {
    access: access,
    username: username,
  };
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const options = { expiresIn: '2h' };

  try {
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const signRefreshToken = async (username) => {
  const payload = {
    username: username,
  };
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const options = { expiresIn: '24h' };

  try {
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const signResetPasswordToken = async (email, password) => {
  const payload = {
    email: email,
  };
  const secret = process.env.RESET_PASSWORD_TOKEN_SECRET + password;
  const options = { expiresIn: '10min' };

  try {
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const verifyResetPasswordToken = async (token, password) => {
  try {
    const secret = process.env.RESET_PASSWORD_TOKEN_SECRET + password;
    const result = jwt.verify(token, secret);
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};
