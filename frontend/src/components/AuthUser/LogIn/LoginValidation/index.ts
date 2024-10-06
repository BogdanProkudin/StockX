import * as Yup from "yup";

export const email = Yup.string()
  .min(2, "Email must be at least 5 characters")
  .required("Email is required");
export const password = Yup.string()
  .min(2, "Password must be at least 8 characters")
  .required("Password is required");
