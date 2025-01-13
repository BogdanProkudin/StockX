import { useMediaQuery } from "@mui/material";
import Header from "../components/Header/Header";
import NavHeader from "../components/SecondHeader/NavHeader";
import styles from "./styles.module.scss";
import { Outlet, useOutletContext } from "react-router-dom";

import { OutletPrivateRouteProps } from "../@types/userCardTypes";
import ProfileSideBar from "../components/Profile/ProfileSideBar/ProfileSideBar";
import React from "react";

const ProfileLayout = () => {
  const isLargeScreen = useMediaQuery("(min-width: 770px)");
  const isShowSideBar =
    window.location.pathname !== "/settings/profile" &&
    window.location.pathname !== "/settings/shipping";
  const [activeTab, setActiveTab] = React.useState("");

  const { isError, data, isLoading } =
    useOutletContext<OutletPrivateRouteProps>();

  return (
    <>
      <div className={styles.headerBar}>
        {data && <Header />}
        {isLargeScreen && data && <NavHeader />}

        <div>
          {!isLoading && !isError && (
            <div className="flex">
              {isShowSideBar && (
                <ProfileSideBar
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                />
              )}
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ProfileLayout;
