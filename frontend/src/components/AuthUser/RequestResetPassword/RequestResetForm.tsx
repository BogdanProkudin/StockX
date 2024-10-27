import React from "react";
import styles from "./styles.module.scss";

import RequestResetButton from "./RequestResetButton";

const RequestResetForm: React.FC = () => {
  const [inputValue, setInputValue] = React.useState("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
        <RequestResetButton
          setInputValue={setInputValue}
          inputValue={inputValue}
        />
      </form>
    </>
  );
};

export default RequestResetForm;
