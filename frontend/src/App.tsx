import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

import "./scss/styles.scss";
import Profile from "./pages/Profile";

import ResetPage from "./pages/ResetPassword";

import HeaderLayout from "./layout/HeaderLayout";
import FullProduct from "./pages/ProductItem";

function App() {
  const userToken = localStorage.getItem("token");

  return (
    <>
      <Routes>
        <Route path="/" element={<HeaderLayout />}>
          <Route path="" element={<Home />} />
          <Route path="/:id" element={<FullProduct />} />
        </Route>
        <Route
          path="/auth"
          element={userToken ? <Navigate to="/profile" /> : <Auth />}
        />
        <Route path="/profile" element={<Profile />} />

        <Route path="/resetPassword/:token" element={<ResetPage />} />
      </Routes>
    </>
  );
}

export default App;
