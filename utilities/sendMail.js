import nodemailer from 'nodemailer';
import { API } from '../config/api.js';

// This function takes email,userId,token
// uses nodemailer npm and gmail service to send password reset email to the user requesting password reset
export const sendPasswordResetMail = async (email, _id, token) => {
  const link = `${API}/auth/resetpassword/${_id}/${token}`;
  // console.log(link)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    to: email,
    from: 'ashvinck10@gmail.com',
    text: 'Reset Password',
    subject: 'Reset Password for your dashboard',
    text: `Hello,Follow this link to reset your dashboard password for your ${email} account.
        ${link}.If you didn\\'t ask to reset your password, you can ignore this email.
        Thanks,
        Your dashboard Admin`,
    html: `<h4>Reset your Password</h4><br>
        <p>Hello , Follow this link to reset your dashboard password for your ${email} account.This link is valid for 10 minutes.</p>
        ${link}
        <p>If you didn\'t ask to reset your password, you can ignore this email.</p>
    <p>Thanks,</p>
        <p>Your dashboard Admin</p>
        `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
    return;
  }
};
