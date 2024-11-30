import Header from "../components/Header/Header";
import NavHeader from "../components/SecondHeader/NavHeader";

import styles from "./styles.module.scss";

import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useAppSelector } from "../redux/hook";
const HeaderLayout = () => {
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
      <div className="container">
        <Outlet />
      </div>
      {!isSearching && <Footer />}
    </>
  );
};

export default HeaderLayout;
