import { useMediaQuery } from "@mui/material";

import { useOutletContext } from "react-router-dom";
import Header from "../components/Header/Header";
import NavHeader from "../components/SecondHeader/NavHeader";

import styles from "./styles.module.scss";
import { OutletPrivateRouteProps } from "../@types/userCardTypes";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { isError, data, isLoading } =
    useOutletContext<OutletPrivateRouteProps>();
  const isLargeScreen = useMediaQuery("(min-width: 770px)");

  return (
    <>
      <div className={styles.headerBar}>
        {data && <Header />}
        {isLargeScreen && data && <NavHeader />}

        <div>{!isLoading && isError && children}</div>
      </div>
    </>
  );
};
export default AuthLayout;
