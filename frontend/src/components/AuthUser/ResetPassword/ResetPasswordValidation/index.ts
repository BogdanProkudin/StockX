import * as Yup from "yup";
export const resetPasswordValidationSchema = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must be at least 1 uppercase letter")
  .matches(/\d/, "Password must be at least 1 number")
  .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must be at least 1 symbol")
  .required("Password is required");

export const confirmPasswordValidationSchema = Yup.string()
  .oneOf([Yup.ref("password")], "Passwords must match") // Проверка на соответствие паролю
  .required("Confirm password is required");
