import { validationResult } from "express-validator";

export const ErrorValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json(errors.array());
    // res.status(404).json(errors.array("error 404 cannot registr"));
  }
  next();
};
