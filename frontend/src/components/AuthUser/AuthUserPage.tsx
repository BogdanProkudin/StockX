import { useState } from "react";
import styles from "./styles.module.scss";
import AuthSwitcher from "./AuthUserModeSwitcher";
const AuthUserPage = () => {
  const [authMode, setAuthMode] = useState("Sign Up");
  return (
    <div className={styles.auth_user_page_container}>
      <div className={styles.auth_user_logo_container}>
        <img src="https://stockx.hyperwallet.com/hw2web/javax.faces.resource/261458761689/en/login_logo.png.xhtml?ln=img" />
      </div>
      <AuthSwitcher authMode={authMode} setAuthMode={setAuthMode} />
    </div>
  );
};

export default AuthUserPage;
