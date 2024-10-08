import { useForm } from "react-hook-form";
import header_styles from "../styles.module.scss";
import styles from "./styles.module.scss";
import HeaderAuth from "../HeaderAuth";
import ResetForm from "./ResetForm";

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
