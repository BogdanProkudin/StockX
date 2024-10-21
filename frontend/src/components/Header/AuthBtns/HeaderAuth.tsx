import React, { useRef } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppDispatch } from "../../../redux/hook";
import { setAuthSwitcher } from "../../../redux/slices/authSlice";
import NavBellPopUp from "./BellPopUp/NavBellPopUp";
const HeaderAuth: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClickBell = () => {
    setIsOpen(!isOpen);
  };
  const bellBtnRef = useRef<HTMLButtonElement>(null);
  return (
    <div className={styles.header_auth_user}>
      <div className={styles.header_bell_auth}>
        <button
          ref={bellBtnRef}
          onClick={onClickBell}
          className={styles.bellBtn}
        >
          <NotificationsIcon />
        </button>
        {isOpen && <NavBellPopUp bellRef={bellBtnRef} setIsOpen={setIsOpen} />}
      </div>
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
