import React from "react";
import { useAppSelector } from "../../../redux/hook";
import styles from "./styles.module.scss";
const LogInErrors: React.FC = () => {
  const validationErrors = useAppSelector(
    (state) => state.userAuth.validationErrors
  );
  const loginBackendErrors = useAppSelector(
    (state) => state.userAuth.loginBackendErrors
  );
  console.log("log", loginBackendErrors);

  return (
    <>
      {validationErrors.length >= 1 ? (
        <div className={styles.logIn_error_container}>
          <p>{validationErrors[0]}</p>
        </div>
      ) : loginBackendErrors.length > 1 ? (
        <div className={styles.logIn_error_container}>
          <p>{loginBackendErrors}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LogInErrors;
