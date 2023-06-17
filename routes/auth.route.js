import express from 'express';
import dotenv from 'dotenv';
import {
  forgotPasswordvalidation,
  loginValidation,
  resetPasswordValidation,
  signUpValidation,
} from '../middleware/inputValidation.js';
import {
  forgotUserPassword,
  loginUser,
  refreshUser,
  resetUserPassword,
  signUpUser,
} from '../controller/auth.controller.js';

dotenv.config();

const router = express.Router();

// ---- `/auth/routes` -------
router.post('/signup', signUpValidation(), express.json(), signUpUser);
router.post('/login', loginValidation(), express.json(), loginUser);
router.get('/refresh', refreshUser);
router.post(
  '/forgotpassword',
  forgotPasswordvalidation(),
  express.json(),
  forgotUserPassword
);
router.post(
  '/resetpassword/:_id/:token',
  express.json(),
  resetPasswordValidation(),
  resetUserPassword
);

export default router;
