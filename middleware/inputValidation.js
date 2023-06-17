import { check, validationResult } from 'express-validator';

// Validation using Express-validator for signup,signin,login,resetpassword
export const signUpValidation = () => {
  return [
    check('username')
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage('username must be at least 3 characters')
      .trim(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('password')
      .notEmpty()
      .withMessage('Password should not be empty')
      .isLength({ min: 8, max: 15 })
      .withMessage('Password must be between 8 and 15 characters')
      .matches(/\d/)
      .withMessage('Password should contain a numerical character')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('Password should contain a special character'),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password fields do not match');
      }
      return true;
    }),

    (request, response, next) => {
      const errors = validationResult(request);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = [];
      errors.array().map((err) => extractedErrors.push({ message: err.msg }));

      return response.status(422).json({ errors: extractedErrors });
    },
  ];
};

export const loginValidation = () => {
  return [
    check('email', 'Please enter a valid email address').isEmail(),
    check('password').notEmpty().withMessage('Password field cannot be empty'),
    (request, response, next) => {
      const errors = validationResult(request);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = [];
      errors.array().map((err) => extractedErrors.push({ message: err.msg }));

      return response.status(409).json({ errors: extractedErrors });
    },
  ];
};

export const forgotPasswordvalidation = () => {
  return [
    check('email', 'Please enter a valid email address').isEmail(),
    (request, response, next) => {
      const errors = validationResult(request);
      if (errors.isEmpty()) {
        return next();
      }
      console.log(errors);
      return response
        .status(401)
        .json({ message: 'Please enter a valid email address' });
    },
  ];
};

export const resetPasswordValidation = () => {
  return [
    check('password')
      .notEmpty()
      .withMessage('Password should not be empty')
      .isLength({ min: 8, max: 15 })
      .withMessage('your password should have min and max length between 8-15')
      .matches(/\d/)
      .withMessage('your password should have at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('your password should have at least one special character'),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match with password');
      }
      return true;
    }),

    (request, response, next) => {
      const errors = validationResult(request);

      if (errors.isEmpty()) {
        // console.log(errors);
        return next();
      } else {
        const extractedErrors = [];
        errors.array().map((err) => extractedErrors.push({ message: err.msg }));
        // console.log(extractedErrors);
        return response.status(409).json({ errors: extractedErrors });
      }
    },
  ];
};
