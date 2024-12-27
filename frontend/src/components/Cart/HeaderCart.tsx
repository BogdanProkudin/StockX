import React from "react";
import HeaderLogo from "../Header/Logo/HeaderLogo";

const HeaderCart = () => {
  return (
    <header className="border-b border-[#cfcfcf]">
      <div className="container">
        <div className="flex items-center justify-between py-8">
          <HeaderLogo />
          <span className="cursor-pointer text-xl text-[#008000]">FAQ</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderCart;
