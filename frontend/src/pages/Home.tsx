import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";

const Home: React.FC = () => {
  const onClickLogout = () => {
    localStorage.removeItem("token");
  };
  return (
    <div>
      <Header />
      Home
      <Link to={"/auth"}>login</Link>
      <button onClick={onClickLogout}>Logout</button>
    </div>
  );
};

export default Home;
