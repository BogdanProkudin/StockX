import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
const HeaderAuth: React.FC = () => {
  return (
    <div className={styles.header_auth_user}>
      <button className={styles.Login}>
        <Link to={"/Auth"}>Log In</Link>
      </button>
      <button className={styles.Signup}>
        <Link to={"/Auth"}>Sign Up</Link>
      </button>
    </div>
  );
};

export default HeaderAuth;
