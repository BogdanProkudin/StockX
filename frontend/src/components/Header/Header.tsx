import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import HeaderLogo from "./Logo/HeaderLogo";
import HeaderNavigation from "./Navigation/HeaderNavigation";

import HeaderInput from "./Search/HeaderInput";
import HeaderAuth from "./AuthBtns/HeaderAuth";

import HeaderUser from "./UserBtns/HeaderUser";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeaderSmallScreenInput from "./Search/HeaderSmallScreenInput";

const Header: React.FC = () => {
  const userToken = localStorage.getItem("token");
  const isLargeScreen = useMediaQuery("(min-width: 770px)");
  const [isShowSmallScreenInput, setIsShowSmallScreenInput] =
    React.useState(false);
  useEffect(() => {
    if (isLargeScreen) {
      setIsShowSmallScreenInput(false);
    }
  }, [isLargeScreen]);
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div
          style={{
            justifyContent: isShowSmallScreenInput
              ? " normal"
              : "space-between",
          }}
          className={`${styles.header_wrapper} ${
            userToken ? styles.active : ""
          }`}
        >
          <svg viewBox="0 0 50 50" focusable="false" className="h-7 w-7">
            <g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 16.25V14H43V16.25H7Z"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M43 26.5H7V24.25H43V26.5Z"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M43 36.75H7V34.5H43V36.75Z"
              ></path>
            </g>
          </svg>
          {isShowSmallScreenInput && !isLargeScreen && (
            <HeaderSmallScreenInput />
          )}
          {!isShowSmallScreenInput && <HeaderLogo />}
          {isLargeScreen ? <HeaderInput /> : null}

          {isLargeScreen ? <HeaderNavigation /> : null}
          {isLargeScreen && userToken ? <HeaderUser /> : null}
          {isLargeScreen && !userToken ? <HeaderAuth /> : null}
          <svg
            onClick={() => setIsShowSmallScreenInput(!isShowSmallScreenInput)}
            className="h-7 w-7"
            viewBox="0 0 50 50"
            focusable="false"
          >
            <path
              fill="currentColor"
              d="M33.8 31.5L32.5 31.6C34.9 29 36.4 25.5 36.4 21.7C36.4 13.7 29.9 7.10001 21.8 7.10001C13.7 7.10001 7.3 13.7 7.3 21.7C7.3 29.7 13.8 36.3 21.9 36.3C25.6 36.3 29 34.9 31.5 32.6L31.4 34L40.3 42.9L42.7 40.5L33.8 31.5ZM21.9 33.3C15.5 33.3 10.3 28.1 10.3 21.7C10.3 15.3 15.5 10.1 21.9 10.1C28.3 10.1 33.5 15.3 33.5 21.7C33.5 28.1 28.2 33.3 21.9 33.3Z"
            ></path>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
