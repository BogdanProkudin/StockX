import Header from "../components/Header/Header";
import NavHeader from "../components/SecondHeader/NavHeader";

import styles from "./styles.module.scss";
import { useAppSelector } from "../redux/hook";
import { Outlet } from "react-router-dom";
const HeaderLayout = () => {
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
