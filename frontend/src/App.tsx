import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ResetPage from "./pages/ResetPassword";
import HeaderLayout from "./layout/HeaderLayout";

import FoundItems from "./components/FoundItems";
import { useAppSelector } from "./redux/hook";

import "./scss/styles.scss";
import FullProduct from "./pages/ProductItem";

function App() {
  const userToken = localStorage.getItem("token");
  const searchInputValue = useAppSelector(
    (state) => state.searchSlice.searchValue,
  );

  return (
    <Routes>
      <Route path="/" element={<HeaderLayout />}>
        <Route
          path=""
          element={
            searchInputValue.length > 0 ? (
              <div className="mt-6 flex items-center justify-center">
                <FoundItems />
              </div>
            ) : (
              <Home />
            )
          }
        />
        <Route
          path=":id"
          element={
            searchInputValue.length > 0 ? (
              <div className="mt-6 flex items-center justify-center">
                <FoundItems />
              </div>
            ) : (
              <FullProduct />
            )
          }
        />
      </Route>

      <Route
        path="/auth"
        element={userToken ? <Navigate to="/profile" /> : <Auth />}
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/resetPassword/:token" element={<ResetPage />} />
    </Routes>
  );
}

export default App;
