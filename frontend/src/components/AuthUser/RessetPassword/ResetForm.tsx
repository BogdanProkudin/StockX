import React from "react";
import styles from "./styles.module.scss";

const ResetForm: React.FC = () => {
  const [inputValue, setInputValue] = React.useState("");
  const onChangeInput = (e: any) => {
    setInputValue(e.target.value);
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
        <button className={styles.btnReset} type="submit">
          Reset Password
        </button>
      </form>
    </>
  );
};

export default ResetForm;
