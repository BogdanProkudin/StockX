import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetUserDataQuery } from "../redux/api/mainApiSlice";
import { useAppDispatch } from "../redux/hook";
import { setUserData } from "../redux/slices/profileSlice";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isError, isLoading } = useGetUserDataQuery({});

  useEffect(() => {
    console.log("изменились данные");

    if ((!isLoading && data === undefined) || (!isLoading && isError)) {
      navigate("/auth", { replace: true });
      console.log("isError");
    } else if (
      (!isLoading && window.location.pathname === "/auth") ||
      (!isLoading && window.location.pathname === "/Auth") ||
      (!isLoading &&
        window.location.pathname === "/resetPassword/:token" &&
        data)
    ) {
      navigate("/profile", { replace: true });
      dispatch(setUserData(data));
    } else if (data) {
      dispatch(setUserData(data));
      return;
    }
  }, [data, isError]);
  return <Outlet context={{ isLoading, isError, data }} />;
};

export default MainLayout;
