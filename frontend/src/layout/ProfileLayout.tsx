import { useMediaQuery } from "@mui/material";
import Header from "../components/Header/Header";
import NavHeader from "../components/SecondHeader/NavHeader";
import styles from "./styles.module.scss";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useGetUserDataQuery } from "../redux/api/mainApiSlice";
import { useAppDispatch } from "../redux/hook";
import { setUserData } from "../redux/slices/profileSlice";
import { OutletPrivateRouteProps } from "../@types/userCardTypes";
import ProfileSideBar from "../components/Profile/ProfileSideBar/ProfileSideBar";
import React from "react";

const ProfileLayout = () => {
  const isLargeScreen = useMediaQuery("(min-width: 770px)");

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
            <div className="flex w-full">
              <ProfileSideBar
                setActiveTab={setActiveTab}
                activeTab={activeTab}
              />
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ProfileLayout;
