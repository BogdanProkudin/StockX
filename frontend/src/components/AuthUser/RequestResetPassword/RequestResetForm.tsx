import React from "react";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  resetUserPassword,
  setRequestResetPasswordError,
} from "../../../redux/slices/authSlice";

const RequestResetForm: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = React.useState("");
  const isSending = useAppSelector((state) => state.userAuth.status);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendResetEmail = async (e: any) => {
    e.preventDefault();
    if (inputValue.length >= 4) {
      const response = await dispatch(resetUserPassword({ email: inputValue }));
      if (response.payload === "Password reset email sent") {
        setInputValue("");
      }
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
          disabled={isSending === "loading" ? true : false}
          onClick={(e) => handleSendResetEmail(e)}
          className={`${styles.request_reset_password_button} ${
            isSending === "loading" ? styles.active : ""
          }`}
        >
          {isSending === "loading" ? "Sending" : "Reset Password"}
        </button>
      </form>
    </>
  );
};

export default RequestResetForm;
