import React, { useMemo } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
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
import ProfileLayout from "./layout/ProfileLayout";
import ProductPageLayout from "./layout/ProductPageLayout";
import EditProfleForm from "./components/Profile/ProfileDetails/PersonalInformation/EditProfileForm/EditProfleForm";
import ProfileBuying from "./components/Profile/ProfileBuying/ProfileBuying";

type ComponentType = React.FC;

function App() {
  const profileUrl = [
    "profile",
    "selling",
    "buying",
    "favorites",
    "portfolio",
    "wallet",
    "settings",
  ];
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

        <Route path="search" element={renderMainContent(FilterPage)} />
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />

        {/* <Route path=":title" element={<FullProduct />} /> */}
      </Route>
      <Route path=":title" element={<ProductPageLayout />}>
        <Route index element={<FullProduct />} />
      </Route>

      <Route path="/" element={<ProfileLayout />}>
        <Route path="auth" element={<Auth />} />
        <Route path="settings/profile" element={<EditProfleForm />} />
        {profileUrl.map((el, id) => (
          <Route key={id} path={el} element={<Profile />} />
        ))}
        <Route path="buying/order" element={<ProfileBuying />} />
        <Route path="buying/bids" element={<ProfileBuying />} />
        <Route path="buying/history" element={<ProfileBuying />} />
      </Route>

      {/* <Route
        path="/profile"
        element={
          <ProfileLayout>
            <Profile />
          </ProfileLayout>
        }
      />
      <Route
        path="/selling"
        element={
          <ProfileLayout>
            <Profile />
          </ProfileLayout>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProfileLayout>
            <Profile />
          </ProfileLayout>
        }
      />
      <Route
        path="/buying"
        element={
          <ProfileLayout>
            <Profile />
          </ProfileLayout>
        }
      />
      <Route
        path="/portfolio"
        element={
          <ProfileLayout>
            <Profile />
          </ProfileLayout>
        }
      />
      <Route
        path="/wallet"
        element={
          <ProfileLayout>
            <Profile />
          </ProfileLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <ProfileLayout>
            <Profile />
          </ProfileLayout>
        }
      /> */}
      <Route path="/buy/:title" element={<Cart />} />
      {/* <Route
        path="/auth"
        element={
          <ProfileLayout>
            <Auth />
          </ProfileLayout>
        }
      /> */}
      {/* <Route
        path="/settings/profile"
        element={
          <ProfileLayout>
            <EditProfleForm />
          </ProfileLayout>
        }
      />
      <Route path="/resetPassword/:token" element={<ResetPage />} /> */}
    </Routes>
  );
}

export default App;
