import { body } from "express-validator";

export const registerValidation = [
  body("email", "Wrong email").isEmail(),
  body("password", "Wrong password").isLength({ min: 8 }),
  body("firtName", "Wrong FirstName").isLength({ min: 4, max: 25 }).isString(),
  body("secondName", "Wrong SecondName")
    .isLength({ min: 4, max: 25 })
    .isString(),
];
