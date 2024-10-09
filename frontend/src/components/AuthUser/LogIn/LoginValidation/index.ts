import * as Yup from "yup";

export const emailLoginValidation = Yup.string()
  .min(2, "Email must be at least 5 characters")
  .required("Email is required");
export const passwordLoginValidation = Yup.string()
  .min(2, "Password must be at least 8 characters")
  .required("Password is required");
