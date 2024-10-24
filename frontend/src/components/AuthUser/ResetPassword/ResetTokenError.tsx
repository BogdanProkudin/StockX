import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
import styles from "./styles.module.scss";

const ResetTokenError = () => {
  const navigate = useNavigate();
  const handleRequestNewToken = (e: any) => {
    e.preventDefault();
    // Логика для повторного запроса сброса пароля
    console.log("NEW TOKEN REQUESTED");
    navigate("/Auth", { replace: true });
  };
  return (
    <div className={styles.reset_password_container}>
      <div
        style={{ width: "400px" }}
        className={styles.reset_password_content_container}
      >
        <p className={styles.reset_password_description}>
          The password reset link is invalid or has expired.
        </p>
        <p className={styles.reset_password_description}>
          Please request a new one.
        </p>
      </div>
      <button
        onClick={(e) => handleRequestNewToken(e)}
        className={styles.reset_password_button}
      >
        Request new reset link
      </button>
    </div>
  );
};

export default ResetTokenError;
