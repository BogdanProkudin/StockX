import React from "react";
import styles from "./Login.module.scss";
const Login: React.FC = () => {
  return (
    <>
      <form className={styles.loginForm}>
        <h3 className={styles.title}>Login In</h3>
        <input type="text" />
        <input type="text" />

        {/* <a href="">Forgot Password?</a> */}

        <button></button>
      </form>
    </>
  );
};

export default Login;
