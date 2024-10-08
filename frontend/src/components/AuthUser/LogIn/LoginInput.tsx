import React from "react";
import styles from "./styles.module.scss";
import { LoginInputPros } from "../@types/LoginTypes";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

import { useAppDispatch } from "../../../redux/hook";
import { setResetPass } from "../../../redux/slices/authSlice";
const LogInInput: React.FC<LoginInputPros> = ({ name, register, watch }) => {
  const dispatch = useAppDispatch();
  const [visibPass, isVisibPass] = React.useState<boolean>(false);
  const placeholder =
    name === "email" ? "Email" : name === "password" ? "Password" : "text";
  const inputValue = watch(name);

  const oncClickReset = () => {
    dispatch(setResetPass(true));
  };
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
            inputValue ? styles.active : ""
          }`}
        >
          {placeholder}
        </label>
      </div>
      {name === "password" && (
        <p onClick={oncClickReset} className={styles.login_resset_pass}>
          Forgot Password?
        </p>
      )}
    </>
  );
};

export default LogInInput;
