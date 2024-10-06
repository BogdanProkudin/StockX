import { useAppSelector } from "../../../redux/hook";
import styles from "./styles.module.scss";
const SignUpError = () => {
  const validationErrors = useAppSelector(
    (state) => state.userAuth.validationErrors
  );
  const registrationBackendErrors = useAppSelector(
    (state) => state.userAuth.registrationBackendErrors
  );
  console.log("ZZZZ", registrationBackendErrors);

  return (
    <>
      {validationErrors.length >= 1 ? (
        <div className={styles.signUp_error_container}>
          <p>{validationErrors[0]}</p>
        </div>
      ) : registrationBackendErrors.length > 1 ? (
        <div className={styles.signUp_error_container}>
          <p>{registrationBackendErrors}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SignUpError;
