import { useEffect } from "react";
import ResetForm from "./ResetForm";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../../redux/hook";
import { isResetPasswordTokenValid } from "../../../redux/slices/authSlice";
const index = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const path = location.pathname;
    const tokenFromUrl = path.split("/resetPassword/")[1];
    dispatch(isResetPasswordTokenValid({ resetPasswordToken: tokenFromUrl }));
  }, []);
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
