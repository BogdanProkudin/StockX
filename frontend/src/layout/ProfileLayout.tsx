import { useMediaQuery } from "@mui/material";
import Header from "../components/Header/Header";
import NavHeader from "../components/SecondHeader/NavHeader";
import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  const isLargeScreen = useMediaQuery("(min-width: 770px)");
  return (
    <>
      <div className={styles.headerBar}>
        <Header />
        {isLargeScreen && <NavHeader />}
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default ProfileLayout;
