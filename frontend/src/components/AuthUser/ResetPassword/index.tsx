import ResetForm from "./ResetForm";
import styles from "./styles.module.scss";
const index = () => {
  return (
    <div className={styles.reset_password_container}>
      <h1 className={styles.reset_password_title}>Create new password</h1>
      <div className={styles.reset_password_container}>
        <div className={styles.reset_password_content_container}>
          <p className={styles.reset_password_description}>
            Please enter the email address that is associated with your StockX
            account.
          </p>
        </div>
        <ResetForm />
      </div>
    </div>
  );
};

export default index;
