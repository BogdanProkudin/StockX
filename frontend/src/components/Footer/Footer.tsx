import React from "react";
import CardFooter from "./CardFooter/CardFooter";
import NavFooter from "./NavFooter/NavFooter";
import BottFooter from "./BottFooter/BottFooter";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/not-found" && <CardFooter />}
      <NavFooter />
      <BottFooter />
    </div>
  );
};

export default Footer;
