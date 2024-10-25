import { useAppSelector } from "../../../redux/hook";
import styles from "./styles.module.scss";

const ResetPasswordSucces = () => {
  const isPasswordReset = useAppSelector(
    (state) => state.userAuth.resetPasswordStatus
  );
  const resetPasswordError = useAppSelector(
    (state) => state.userAuth.resetPasswordError
  );

  return (
    <>
      {resetPasswordError.length === 0 && isPasswordReset === "success" && (
        <div className={styles.reset_password_succes_container}>
          <p>Password was changed</p>
        </div>
      )}
    </>
  );
};

export default ResetPasswordSucces;
