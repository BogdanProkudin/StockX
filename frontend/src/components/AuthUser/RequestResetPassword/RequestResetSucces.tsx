import { useAppSelector } from "../../../redux/hook";
import styles from "./styles.module.scss";

const RequestResetSucces = () => {
  const isEmailSent = useAppSelector(
    (state) => state.userAuth.resetPasswordStatus
  );
  console.log("email", isEmailSent);

  return (
    <>
      {isEmailSent === "success" && (
        <div className={styles.request_reset_password_succes_container}>
          <p>Email was sent</p>
        </div>
      )}
    </>
  );
};

export default RequestResetSucces;
