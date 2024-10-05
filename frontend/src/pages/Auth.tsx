import { useState } from "react";
import styles from "../components/AuthUser/styles.module.scss";
import AuthSwitcher from "../components/AuthUser/AuthUserModeSwitcher";
import SignUp from "../components/AuthUser/SignUp/SignUp";
import LogIn from "../components/AuthUser/LogIn/LogIn";
const Auth = () => {
  const [authMode, setAuthMode] = useState("Sign Up");
  return (
    <div className={styles.auth_user_page_container}>
      <div className={styles.auth_user_logo_container}>
        <img src="https://stockx.hyperwallet.com/hw2web/javax.faces.resource/261458761689/en/login_logo.png.xhtml?ln=img" />
      </div>
      <div className={styles.auth_mode_container}>
        <AuthSwitcher authMode={authMode} setAuthMode={setAuthMode} />
        {authMode === "Sign Up" ? <SignUp /> : <LogIn />}
      </div>
    </div>
  );
};

export default Auth;
