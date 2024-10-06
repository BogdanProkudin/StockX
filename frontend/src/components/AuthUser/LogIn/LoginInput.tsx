import React from "react";
import styles from "./styles.module.scss";
import { LoginInputPros } from "../@types/LoginTypes";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
const LogInInput: React.FC<LoginInputPros> = ({
  name,
  register,
  watch,
  errors,
}) => {
  const [visibPass, isVisibPass] = React.useState<boolean>(false);
  const placeholder =
    name === "email" ? "Email" : name === "password" ? "Password" : "text";
  const inputvalue = watch(name);
  return (
    <div className={styles.logIn_input_container}>
      <input className={styles.input_field} type={name} {...register(name)} />
      {visibPass ? (
        <IoEyeOutline
          onClick={() => isVisibPass(!visibPass)}
          className={styles.logIn_input_password_close_icon}
        />
      ) : (
        <IoEyeOffOutline
          onClick={() => isVisibPass(!visibPass)}
          className={styles.logIn_input_password_close_icon}
        />
      )}
      <label
        className={`${styles.floating_label} ${
          inputvalue ? styles.active : ""
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default LogInInput;
