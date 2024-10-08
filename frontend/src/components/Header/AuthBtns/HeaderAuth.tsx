import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
const HeaderAuth: React.FC = () => {
  return (
    <div className={styles.header_auth_user}>
      <button className={styles.bellBtn}>
        <NotificationsIcon />
      </button>
      <Link to={"/Auth"}>
        <button className={styles.Login}>Login </button>
      </Link>
      <Link to={"/Auth"}>
        <button className={styles.Signup}>Sign Up </button>
      </Link>
    </div>
  );
};

export default HeaderAuth;
