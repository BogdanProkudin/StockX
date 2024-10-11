import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

import "./scss/styles.scss";
import Profile from "./pages/Profile";

import ResetPage from "./pages/ResetPassword";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { authMe } from "./redux/slices/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userAuth.userData);
  const userToken = localStorage.getItem("token");
  React.useEffect(() => {
    dispatch(authMe());
  }, []);
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={userToken ? <Navigate to="/profile" /> : <Auth />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resetPassword/:token" element={<ResetPage />} />
      </Routes>
      {/* <AuthUserPage /> */}
    </>
  );
}

export default App;
