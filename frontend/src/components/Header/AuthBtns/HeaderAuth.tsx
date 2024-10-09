import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppDispatch } from "../../../redux/hook";
import { setAuthSwitcher } from "../../../redux/slices/authSlice";
const HeaderAuth: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.header_auth_user}>
      <button className={styles.bellBtn}>
        <NotificationsIcon />
      </button>
      <Link to={"/Auth"}>
        <button
          onClick={() => dispatch(setAuthSwitcher("Log In"))}
          className={styles.Login}
        >
          Login{" "}
        </button>
      </Link>
      <Link to={"/Auth"}>
        <button
          onClick={() => dispatch(setAuthSwitcher("Sign Up"))}
          className={styles.Signup}
        >
          Sign Up{" "}
        </button>
      </Link>
    </div>
  );
};

export default HeaderAuth;
