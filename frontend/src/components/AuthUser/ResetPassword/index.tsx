import { useEffect, useState } from "react";
import ResetForm from "./ResetForm";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../../redux/hook";

import ResetTokenError from "./ResetTokenError";
import { isResetPasswordTokenValid } from "../../../redux/thunks/authThunks";
const index = () => {
  const dispatch = useAppDispatch();
  const [isTokenValid, setIsTokenValid] = useState(true);
  useEffect(() => {
    const handleIsTokenValid = async () => {
      const path = location.pathname;
      const tokenFromUrl = path.split("/resetPassword/")[1];
      const response = await dispatch(
        isResetPasswordTokenValid({ resetPasswordToken: tokenFromUrl })
      );

      if (response.payload === "Token is valid") {
        console.log("TOKEN VALID");
        setIsTokenValid(true);
      } else {
        console.log("TOKEN IS NOT VALID");
        setIsTokenValid(false);
      }
    };
    handleIsTokenValid();
  }, []);
  return (
    <div className={styles.reset_password_container}>
      {isTokenValid ? (
        <>
          <h1 className={styles.reset_password_title}>Create new password</h1>
          <div className={styles.reset_password_container}>
            <div className={styles.reset_password_content_container}>
              <p className={styles.reset_password_description}>
                Please enter the email address that is associated with your
                StockX account.
              </p>
            </div>
            <ResetForm />
          </div>
        </>
      ) : (
        <ResetTokenError />
      )}
    </div>
  );
};

export default index;
