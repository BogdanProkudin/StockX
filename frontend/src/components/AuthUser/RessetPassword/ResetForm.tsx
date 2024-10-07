import React from "react";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../../redux/hook";
import { resetUserPassword } from "../../../redux/slices/authSlice";

const ResetForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = React.useState("");
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendResetEmail = (e: any) => {
    e.preventDefault();
    dispatch(resetUserPassword({ email: inputValue }));
  };
  return (
    <>
      <form className={styles.form_wrapper}>
        <div className={styles.input_container}>
          <input
            className={styles.input_field}
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

export default ResetForm;
