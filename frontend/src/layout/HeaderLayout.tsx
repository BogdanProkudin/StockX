import Header from "../components/Header/Header";
import NavHeader from "../components/SecondHeader/NavHeader";

import styles from "./styles.module.scss";

import { matchPath, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useAppSelector } from "../redux/hook";
import { log } from "console";
const HeaderLayout = () => {
  const location = useLocation();
  const isProductPage = matchPath("/:title", location.pathname);
  const isSearching = useAppSelector((state) => state.searchSlice.isSearching);

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
      {!isSearching && <Footer />}
    </>
  );
};

export default HeaderLayout;
