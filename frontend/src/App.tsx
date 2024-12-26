import React, { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ResetPage from "./pages/ResetPassword";
import HeaderLayout from "./layout/HeaderLayout";

import FoundItems from "./components/FoundItems";
import { useAppSelector } from "./redux/hook";

import "./scss/styles.scss";
import FullProduct from "./pages/ProductPage";

import FilterPage from "./pages/FilterPage";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

type ComponentType = React.FC;

function App() {
  const userToken = useMemo(() => localStorage.getItem("token"), []);
  const isSearching = useAppSelector((state) => state.searchSlice.isSearching);

  const renderMainContent = (Component: ComponentType) =>
    isSearching ? (
      <div className="mt-6 flex items-center justify-center">
        <FoundItems />
      </div>
    ) : (
      <Component />
    );

  return (
    <Routes>
      <Route path="/" element={<HeaderLayout />}>
        <Route path="" element={renderMainContent(Home)} />
        <Route path=":title" element={renderMainContent(FullProduct)} />
        <Route path="search" element={renderMainContent(FilterPage)} />
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/buy/:title" element={<Cart />} />
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
