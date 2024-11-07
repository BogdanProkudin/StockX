import React from "react";
import Header from "../components/Header/Header";
import NavHeader from "../components/SecondHeader/NavHeader";
import { Outlet } from "react-router-dom";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import FoundItems from "../components/FoundItems/index";
import styles from "./styles.module.scss";
import { useAppSelector } from "../redux/hook";
const HeaderLayout = () => {
  const searchInputValue = useAppSelector(
    (state) => state.searchSlice.searchValue,
  );
  return (
    <>
      <div className={styles.headerBar}>
        <Header />
        <NavHeader />
      </div>
      {/* <button className={styles.btnTheme}>
        <WbSunnyIcon />
      </button> */}
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default HeaderLayout;
