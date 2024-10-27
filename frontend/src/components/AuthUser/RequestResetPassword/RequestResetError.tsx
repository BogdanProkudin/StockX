import { useAppSelector } from "../../../redux/hook";
import styles from "./styles.module.scss";

const RequestResetError = () => {
  const requestResetPasswordError = useAppSelector(
    (state) => state.userAuth.requestResetPasswordError
  );
  return (
    <>
      {requestResetPasswordError && (
        <div className={styles.request_reset_password_error_container}>
          <p>{requestResetPasswordError}</p>
        </div>
      )}
    </>
  );
};

export default RequestResetError;
