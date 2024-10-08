import { Route, Routes } from "react-router-dom";
import React from "react";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

import "./scss/styles.scss";
import Profile from "./pages/Profile";
import { useAppDispatch } from "./redux/hook";
import { authMe } from "./redux/slices/authSlice";

import ResetPage from "./components/AuthUser/ResetPassword/ResetPage";
function App() {
  const dispatch = useAppDispatch();
  // React.useEffect(() => {
  //   dispatch(authMe());
  // }, []);
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resetPassword/:token" element={<ResetPage />} />
      </Routes>
      {/* <AuthUserPage /> */}
    </>
  );
}

export default App;
