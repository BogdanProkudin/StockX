import Header from "../components/Header/Header";
import NavHeader from "../components/SecondHeader/NavHeader";

import styles from "./styles.module.scss";

import { matchPath, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
const HeaderLayout = () => {
  const location = useLocation();
  const isProductPage = matchPath("/:title", location.pathname);

  return (
    <>
      <div className={styles.headerBar}>
        <Header />
        <NavHeader />
      </div>
      {/* <button className={styles.btnTheme}>
        <WbSunnyIcon />
      </button> */}
      <div className={`container ${isProductPage ? "productPage" : ""}`}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default HeaderLayout;
