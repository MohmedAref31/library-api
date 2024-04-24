import {body} from "express-validator"

import User from "../../models/userModel.js";
import validate from "../../middlewares/validateMiddleware.js";

export const registerValidators = [
    body('name').trim().notEmpty().isLength({ min: 2, max: 100 }),
    body('email').trim().notEmpty().isEmail().custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('Email already exists');
      }
    }),
    body('password').trim().notEmpty().isLength({ min: 6, max: 32 }),
    body('phone').trim().notEmpty().isMobilePhone("ar-EG"),
    body('birthDate').optional().isISO8601(),
    body('role').optional(),
    body('isActive').optional().isBoolean(),
    validate
  ];

export const loginValidators = [
  body('email').trim().notEmpty().isEmail(),
  body('password').trim().notEmpty().isLength({min:6, max:32}).withMessage("password length must be between 6 and 32 characters"),
  validate
]
