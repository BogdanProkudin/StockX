import React from "react";
import { Link } from "react-router-dom";
const Home: React.FC = () => {
  return (
    <div>
      Home
      <Link to={"/login"}>login</Link>
    </div>
  );
};

export default Home;
