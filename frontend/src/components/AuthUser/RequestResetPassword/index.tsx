import React from "react";
import styles from "./styles.module.scss";

import RequestResetForm from "./RequestResetForm";
import RequestResetError from "./RequestResetError";
import RequestResetSucces from "./RequestResetSucces";
const index: React.FC = () => {
  return (
    <div className={styles.request_reset_password_wrapper}>
      <h1 className={styles.request_reset_password_title}>Reset Password</h1>
      <div className={styles.request_reset_password_container}>
        <RequestResetError />
        <RequestResetSucces />
        <div className={styles.request_reset_password_content_container}>
          <p className={styles.request_reset_password_description}>
            Please enter the email address that is associated with your StockX
            account.
          </p>
          <RequestResetForm />
        </div>
      </div>
    </div>
  );
};

export default index;
