import Header from "../components/Header/Header";
import NavHeader from "../components/SecondHeader/NavHeader";

import styles from "./styles.module.scss";

import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
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
      <Footer />
    </>
  );
};

export default HeaderLayout;
