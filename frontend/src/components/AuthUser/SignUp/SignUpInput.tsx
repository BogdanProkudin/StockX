import { useState } from "react";

import { IoEyeOutline } from "react-icons/io5";
import styles from "./styles.module.scss";

import { IoEyeOffOutline } from "react-icons/io5";
import { SignUpInputProps } from "../@types/RegisterTypes";
const SignUpInput: React.FC<SignUpInputProps> = ({ register, watch, name }) => {
  const inputValue = watch(name);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  console.log("INPUT VALUE", inputValue);

  const placeholders =
    name === "firstName"
      ? "First Name"
      : name === "secondName"
        ? "Last Name"
        : name === "email"
          ? "Email Address"
          : "Password";
  return (
    <div className={styles.signUP_input_container}>
      <input
        type={name === "password" && !isShowPassword ? "password" : "text"}
        className={styles.input_field}
        {...register(name)}
      ></input>
      {name === "password" && !isShowPassword ? (
        <IoEyeOffOutline
          onClick={() => setIsShowPassword(true)}
          className={styles.signUp_input_password_close_icon}
        />
      ) : (
        name === "password" && (
          <IoEyeOutline
            onClick={() => setIsShowPassword(false)}
            className={styles.signUp_input_password_close_icon}
          />
        )
      )}
      <label
        className={`${styles.floating_label} ${
          inputValue && inputValue.length > 0 ? styles.active : ""
        }`}
      >
        {placeholders}
      </label>
    </div>
  );
};

export default SignUpInput;
