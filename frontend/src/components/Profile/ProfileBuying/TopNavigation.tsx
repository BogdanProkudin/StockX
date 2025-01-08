import React from "react";

const TopNavigation = () => {
  const navArr = [
    {
      title: "Bids",
    },
    {
      title: "Order",
    },
    {
      title: "History",
    },
  ];
  return (
    <div className="mb-7 flex items-center gap-5 border-b border-[#a4a4a4] pb-2 text-lg">
      {navArr.map((el) => (
        <span>{el.title}</span>
      ))}
    </div>
  );
};

export default TopNavigation;
