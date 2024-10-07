import React from "react";
import styles from "./styles.module.scss";
import HeaderLogo from "./Logo/HeaderLogo";
import HeaderNavigation from "./Navigation/HeaderNavigation";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HeaderInput from "./Search/HeaderInput";
import HeaderAuth from "./AuthBtns/HeaderAuth";
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_wrapper}>
          <HeaderLogo />
          <HeaderInput />
          <HeaderNavigation />
          <HeaderAuth />
        </div>
      </div>
    </header>
  );
};

export default Header;
