import React from "react";
import styles from "../components/AuthUser/styles.module.scss";
import AuthSwitcher from "../components/AuthUser/AuthUserModeSwitcher";
import SignUp from "../components/AuthUser/SignUp/SignUp";
import LogIn from "../components/AuthUser/LogIn/LogIn";

import RequestResetForm from "../components/AuthUser/RequestResetPassword/index";
import { useAppSelector } from "../redux/hook";
import HeaderAuth from "../components/AuthUser/HeaderAuth";

const Auth: React.FC = () => {
  const authMode = useAppSelector((state) => state.userAuth.stateAuthSwitcher);

  const resetPass = useAppSelector((state) => state.userAuth.resetPass);
  return (
    <div className={styles.auth_user_page_container}>
      <HeaderAuth />
      {resetPass ? (
        <RequestResetForm />
      ) : (
        <div className={styles.auth_mode_container}>
          <AuthSwitcher />
          {authMode === "Sign Up" ? <SignUp /> : <LogIn />}
        </div>
      )}
    </div>
  );
};

export default Auth;
