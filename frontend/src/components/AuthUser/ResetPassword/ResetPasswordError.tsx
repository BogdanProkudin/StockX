import { useAppSelector } from "../../../redux/hook";
import styles from "./styles.module.scss";
const ResetPasswordError = () => {
  const resetPasswordError = useAppSelector(
    (state) => state.userAuth.resetPasswordError
  );

  return (
    <>
      {resetPasswordError.length >= 1 && (
        <div className={styles.reset_password_error_container}>
          <p>{resetPasswordError[0]}</p>
        </div>
      )}
    </>
  );
};

export default ResetPasswordError;
