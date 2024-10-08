import header_styles from "../components/AuthUser/styles.module.scss";
import styles from "../components/AuthUser/ResetPassword/styles.module.scss";
import HeaderAuth from "../components/AuthUser/HeaderAuth";
import ResetForm from "../components/AuthUser/ResetPassword/ResetForm";

const ResetPage = () => {
  return (
    <div className={header_styles.auth_user_page_container}>
      <HeaderAuth />

      <div className={styles.reset_pass_wrapper}>
        <h1 className={styles.title}>Create new password</h1>
        <div className={styles.reset_pass_block}>
          <div className={styles.reset_pass_container}>
            <p className={styles.reset_pass_description}>
              Please enter the email address that is associated with your StockX
              account.
            </p>
          </div>
          <ResetForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
