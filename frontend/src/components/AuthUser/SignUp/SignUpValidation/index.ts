import * as Yup from "yup";

export const emailValidationSchema = Yup.string()
  .required("Email is required")
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
    "Email must be vailed",
  )
  .test("len", "Must be at least 3 symbols before '@'", (value) => {
    return value ? value.split("@")[0].length >= 3 : false;
  })

  .test("valid domain", "Domain is not vailed", (value) => {
    const validDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "ukr.net",
      "hotmail.com",
      "icloud.com",
      "mail.com",
      "mail.ru",
    ];
    const domain = value ? value.split("@")[1] : "";
    return value ? validDomains.includes(domain) : true;
  });
export const passwordValidationSchema = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must be at least 1 uppercase letter")
  .matches(/\d/, "Password must be at least 1 number")
  .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must be at least 1 symbol")
  .required("Password is required");
export const firstNameValidationSchema = Yup.string()
  .min(2, "First Name must be at least 2 characters")
  .matches(/^[A-Za-z]+$/, "First Name cannot contain symbols and numbers")
  .required("First Name is required");
export const secondNameValidationSchema = Yup.string()
  .min(2, "Second Name must be at least 2 characters")
  .matches(/^[A-Za-z]+$/, "Second Name cannot contain symbols and numbers")
  .required("Second Name is required");
export const userNameValidationSchema = Yup.string()
  .matches(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores",
  )
  .notRequired();
