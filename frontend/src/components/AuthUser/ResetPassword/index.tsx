import { useEffect, useState } from "react";
import ResetForm from "./ResetForm";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";

import ResetTokenError from "./ResetTokenError";
import { isResetPasswordTokenValid } from "../../../redux/thunks/authThunks";
import ResetPasswordError from "./ResetPasswordError";
import ResetPasswordSucces from "./ResetPasswordSucces";
const index = () => {
  const dispatch = useAppDispatch();
  const isTokenExpired = useAppSelector((state) => state.userAuth.tokenStatus);
  useEffect(() => {
    const handleIsTokenValid = async () => {
      const path = location.pathname;
      const tokenFromUrl = path.split("/resetPassword/")[1];
      await dispatch(
        isResetPasswordTokenValid({ resetPasswordToken: tokenFromUrl }),
      );
    };
    handleIsTokenValid();
  }, []);

  return (
    <div className={styles.reset_password_container}>
      {isTokenExpired !== "error" ? (
        <>
          <h1 className={styles.reset_password_title}>Create new password</h1>
          <div className={styles.reset_password_container}>
            <div className={styles.reset_password_content_container}>
              <p className={styles.reset_password_description}>
                Please enter the email address that is associated with your
                StockX account.
              </p>
            </div>
            <ResetPasswordError />
            <ResetPasswordSucces />
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
