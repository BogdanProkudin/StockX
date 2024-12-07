import { useAppSelector } from "../../../redux/hook";
import styles from "./styles.module.scss";
const ResetPasswordError = () => {
  const resetPasswordError = useAppSelector(
    (state) => state.userAuth.resetPasswordError,
  );
  const resetPasswordBackendError = useAppSelector(
    (state) => state.userAuth.resetPasswordBackendError,
  );
  return (
    <>
      {resetPasswordError.length >= 1 ? (
        <div className={styles.reset_password_error_container}>
          <p>{resetPasswordError[0]}</p>
        </div>
      ) : (
        resetPasswordBackendError.length > 0 && (
          <div className={styles.reset_password_error_container}>
            <p>{resetPasswordBackendError}</p>
          </div>
        )
      )}
    </>
  );
};

export default ResetPasswordError;
