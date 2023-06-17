import nodemailer from 'nodemailer';

export const API = `http://localhost:3000/auth`;

// This function takes email,token
// uses nodemailer npm and gmail service to send a link to verify user email
export const sendAccountActivationMail = async (email, token) => {
  const link = `${API}/verifyaccount/${email}/${token}`;
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
    from: 'dashboard.admin12@gmail.com',
    text: 'Activate your Dashboard Account',
    subject: 'Activate your dashboard account',
    text: `Hello,Follow this link to activate your dashboard account
     ${link}.
        Thanks,
        Your dashboard Admin`,
    html: `<h4>Activate your Account</h4><br>
        <p>Hello,Follow this link to activate your dashboard account.</p>
        <p>${link}</p>
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

// This function takes email,userId,token
// uses nodemailer npm and gmail service to send password reset email to the user requesting password reset
export const sendPasswordResetMail = async (email, _id, token) => {
  const link = `${API}/resetpassword/${_id}/${token}`;
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
