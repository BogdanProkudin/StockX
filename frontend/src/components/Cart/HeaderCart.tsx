import React from "react";
import HeaderLogo from "../Header/Logo/HeaderLogo";

const HeaderCart = () => {
  return (
    <header className="border-b border-[#cfcfcf]">
      <div className="flex items-center justify-between px-14 py-8">
        <HeaderLogo />
        <span className="cursor-pointer text-xl text-[#008000]">FAQ</span>
      </div>
    </header>
  );
};

export default HeaderCart;
