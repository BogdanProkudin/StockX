import React, { useRef } from "react";
import styles from "./styles.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { BellPopUpType } from "../../../../@types/headerTypes";
import { Link } from "react-router-dom";
import { setAuthSwitcher } from "../../../../redux/slices/authSlice";
import { useAppDispatch } from "../../../../redux/hook";
import { chartSvg } from "../../../../assets/HeaderAssets/HeaderBellPopUp";

const NavBellPopUp: React.FC<BellPopUpType> = ({ setIsOpen, bellRef }) => {
  const dispatch = useAppDispatch();
  const popUpRef = useRef<HTMLDivElement>(null);
  const onClickClose = () => {
    setIsOpen(false);
  };
  React.useEffect(() => {
    const onHandleClick = (event: MouseEvent) => {
      if (
        popUpRef.current &&
        bellRef.current &&
        !event.composedPath().includes(popUpRef.current) &&
        !event.composedPath().includes(bellRef.current)
      ) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", onHandleClick);
    return () => {
      document.body.removeEventListener("click", onHandleClick);
    };
  }, []);
  return (
    <div ref={popUpRef} className={styles.root}>
      <div className={styles.popup_top}>
        <h3 className={styles.title}>Message Center</h3>
        <button onClick={onClickClose} className={styles.close_btn}>
          <CloseIcon />
        </button>
      </div>
      <div className={styles.popup_middle}>
        <p className={styles.text}>
          Login or sign up to get notifications about your orders and the
          products you're following.
        </p>
        {chartSvg}
      </div>
      <div className={styles.popup_bottom}>
        <Link to={"/Auth"}>
          <button
            onClick={() => dispatch(setAuthSwitcher("Log In"))}
            className={styles.Login}
          >
            Login
          </button>
        </Link>
        <Link to={"/Auth"}>
          <button
            onClick={() => dispatch(setAuthSwitcher("Sign Up"))}
            className={styles.Signup}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBellPopUp;
