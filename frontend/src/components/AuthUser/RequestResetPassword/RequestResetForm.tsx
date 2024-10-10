import React from "react";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../../redux/hook";
import {
  resetUserPassword,
  setRequestResetPasswordError,
} from "../../../redux/slices/authSlice";

const RequestResetForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = React.useState("");
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendResetEmail = (e: any) => {
    e.preventDefault();
    if (inputValue.length >= 4) {
      dispatch(resetUserPassword({ email: inputValue }));
    } else {
      dispatch(setRequestResetPasswordError("Email is too short"));
    }
  };
  return (
    <>
      <form className={styles.request_reset_password_form_container}>
        <div className={styles.request_reset_password_input_container}>
          <input
            className={styles.request_reset_password_input_field}
            type="email"
            value={inputValue}
            onChange={onChangeInput}
          />
          <label
            className={`${styles.label} ${
              inputValue.length > 0 ? styles.active : ""
            }`}
          >
            Email
          </label>
        </div>
        <button
          onClick={(e) => handleSendResetEmail(e)}
          className={styles.btnReset}
        >
          Reset Password
        </button>
      </form>
    </>
  );
};

export default RequestResetForm;
