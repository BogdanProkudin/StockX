import { useAppSelector } from "../../../store/hook";
import styles from "./styles.module.scss";
const SignUpError = () => {
  const validationErrors = useAppSelector(
    (state) => state.userAuth.validationErrors
  );
  return (
    <>
      {validationErrors.length > 1 && (
        <div className={styles.signUp_error_container}>
          <p>{validationErrors}</p>
        </div>
      )}
    </>
  );
};

export default SignUpError;