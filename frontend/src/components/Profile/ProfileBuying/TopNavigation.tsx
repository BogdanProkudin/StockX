import React from "react";
import { NavLink } from "react-router-dom";

const TopNavigation: React.FC = () => {
  const navArr = [
    {
      title: "Bids",
      link: "/buying/bids",
    },
    {
      title: "Order",
      link: "/buying/order",
    },
    {
      title: "History",
      link: "/buying/history",
    },
  ];

  return (
    <div className="mb-7 flex items-center gap-5 border-b border-[#a4a4a4] text-lg">
      {navArr.map((el, id) => (
        <NavLink
          className={({ isActive }) =>
            `cursor-pointer py-2 transition-all duration-300 ease-in-out hover:border-b-2 hover:border-[#006340] ${isActive ? "border-b-2 border-[#006340]" : "border-b-2 border-transparent"}`
          }
          to={el.link}
          key={id}
        >
          <span>{el.title}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default TopNavigation;
