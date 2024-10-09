import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import { useAppDispatch } from "../redux/hook";
import { setLogout } from "../redux/slices/authSlice";
import NavHeader from "../components/SecondHeader/NavHeader";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const onClickLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLogout());
  };
  return (
    <div>
      <Header />
      <NavHeader />
      Home
      <Link to={"/auth"}>login</Link>
      <button onClick={onClickLogout}>Logout</button>
    </div>
  );
};

export default Home;
