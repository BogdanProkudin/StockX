import React from "react";
import styles from "./styles.module.scss";
import { LoginInputPros } from "../@types/LoginTypes";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

import { Link } from "react-router-dom";
const LogInInput: React.FC<LoginInputPros> = ({ name, register, watch }) => {
  const [visibPass, isVisibPass] = React.useState<boolean>(false);
  const placeholder =
    name === "email" ? "Email" : name === "password" ? "Password" : "text";
  const inputvalue = watch(name);
  return (
    <>
      <div className={styles.logIn_input_container}>
        <input
          className={styles.input_field}
          type={name === "password" && visibPass ? "password" : "text"}
          {...register(name)}
        />
        {name === "password" && !visibPass ? (
          <IoEyeOutline
            onClick={() => isVisibPass(!visibPass)}
            className={styles.logIn_input_password_close_icon}
          />
        ) : (
          name === "password" && (
            <IoEyeOffOutline
              onClick={() => isVisibPass(!visibPass)}
              className={styles.logIn_input_password_close_icon}
            />
          )
        )}
        <label
          className={`${styles.floating_label} ${
            inputvalue ? styles.active : ""
          }`}
        >
          {placeholder}
        </label>
      </div>
      {name === "password" && (
        <Link className={styles.login_pass_link} to={""}>
          Forgot Password?
        </Link>
      )}
    </>
  );
};

export default LogInInput;
