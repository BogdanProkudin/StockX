import React from "react";
import { footerLinks } from "../../../assets/Footer/Footer.tsx";
import { Link } from "react-router-dom";

const NavFooter = () => {
  return (
    <div className="mt-5 w-full bg-[#202020]">
      <div className="container py-[22px]">
        <h1 className="mb-5 text-3xl text-white">StockX. Access the Now.</h1>
        <div className="grid grid-cols-6 gap-6 text-white">
          {footerLinks.map((obj, id) => (
            <div key={id}>
              <h2 className="mb-2 cursor-pointer font-bold hover:underline">
                {obj.title}
              </h2>
              <ul>
                {obj.links.map((obj, id) => (
                  <Link to={obj.href}>
                    <li
                      className="mb-1 cursor-pointer text-xs hover:underline"
                      key={id}
                    >
                      {obj.title}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavFooter;
