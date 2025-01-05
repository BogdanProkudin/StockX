import { useMediaQuery } from "@mui/material";
import Header from "../components/Header/Header";
import NavHeader from "../components/SecondHeader/NavHeader";
import styles from "./styles.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useGetUserDataQuery } from "../redux/api/mainApiSlice";
import { useAppDispatch } from "../redux/hook";
import { setUserData } from "../redux/slices/profileSlice";

interface ProfileLayoutProps {
  children: ReactNode; // Тип для дочерних элементов
}
const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 770px)");
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isError, isLoading } = useGetUserDataQuery({});
  console.log(isError, "iserror", data);

  useEffect(() => {
    if (isError) {
      navigate("/auth");
    } else {
      navigate("/profile");
      dispatch(setUserData(data));
    }
  }, [data, isError]);

  return (
    <>
      <div className={styles.headerBar}>
        {data && <Header />}
        {isLargeScreen && data && <NavHeader />}
        <div>{!isLoading && children}</div>
      </div>
    </>
  );
};
export default ProfileLayout;
