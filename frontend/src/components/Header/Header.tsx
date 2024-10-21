import React from "react";
import styles from "./styles.module.scss";
import HeaderLogo from "./Logo/HeaderLogo";
import HeaderNavigation from "./Navigation/HeaderNavigation";

import HeaderInput from "./Search/HeaderInput";
import HeaderAuth from "./AuthBtns/HeaderAuth";

import HeaderUser from "./UserBtns/HeaderUser";

const Header: React.FC = () => {
  const userToken = localStorage.getItem("token");

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div
          className={`${styles.header_wrapper} ${
            userToken ? styles.active : ""
          }`}
        >
          <HeaderLogo />
          <HeaderInput />

          <HeaderNavigation />
          {userToken ? <HeaderUser /> : <HeaderAuth />}
        </div>
      </div>
    </header>
  );
};

export default Header;
