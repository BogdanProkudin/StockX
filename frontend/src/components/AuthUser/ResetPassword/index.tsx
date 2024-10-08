import React from "react";
import styles from "./styles.module.scss";

import RequestResetForm from "./RequestResetForm";
const index: React.FC = () => {
  return (
    <div className={styles.reset_pass_wrapper}>
      <h1 className={styles.title}>Reset Password</h1>
      <div className={styles.reset_pass_block}>
        <div className={styles.reset_pass_container}>
          <p className={styles.reset_pass_description}>
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
