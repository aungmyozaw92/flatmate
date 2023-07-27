import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customError.js";

import User from "../models/User.js";

import pkg from "google-libphonenumber";
const { PhoneNumberUtil } = pkg;

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        const firstMessage = errorMessages[0];
        console.log(Object.getPrototypeOf(firstMessage));

        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access this route");
        }
        return res.status(400).json({
          status: false,
          msg: "Please provide required field",
          errors: errorMessages,
        });
        // throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("phone_no")
    .notEmpty()
    .withMessage("Phone number is required.")
    .isMobilePhone("any", { strictMode: false })
    // .withMessage("Invalid phone number format.")
    .custom(async (phone_no) => {
      const user = await User.findOne({ phone_no });
      if (user) {
        throw new BadRequestError("phone_no already exists");
      }
    })
    .custom((value, { req }) => {
      // Specify the country code for validation (e.g., 'US', 'UK', 'IN', etc.)
      const countryCode = "MM";
      const phoneUtil = PhoneNumberUtil.getInstance();
      console.log("phone util", phoneUtil);
      try {
        const phoneNumber = phoneUtil.parseAndKeepRawInput(value, countryCode);
        if (!phoneUtil.isValidNumber(phoneNumber)) {
          throw new Error("Invalid phone number for the specified country.");
        }
        return true;
      } catch (error) {
        throw new Error("Invalid phone number format.");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);
