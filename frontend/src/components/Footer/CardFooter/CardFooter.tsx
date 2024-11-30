import { BookCheck, BookHeart, HandCoins } from "lucide-react";
import React from "react";

const CardFooter = () => {
  const footerCardArray = [
    {
      title: "StockX Verified",
      description:
        "StockX Verified is our own designation and means that we inspect every item, every time.",
      img: <BookCheck size={18} />,
    },
    {
      title: "Our Promise",
      description:
        "We strive to earn and keep your trust. If we make a mistake, we'll make it right.",
      img: <BookHeart size={18} />,
    },
    {
      title: "Start Selling ASAP ",
      description:
        "You can start selling on StockX in just a few clicks, no application process necessary.",
      img: <HandCoins size={18} />,
    },
  ];
  return (
    <div className="container flex items-center justify-between">
      {footerCardArray.map((obj, id) => (
        <div
          key={id}
          className="flex h-[119px] w-[410px] gap-3 rounded-xl bg-[#393939] p-[15px] text-white"
        >
          <div className="mt-1">{obj.img}</div>
          <div>
            <h1 className="leading-md text-text-inverse mb-1 text-[15px] font-bold tracking-[0.004rem]">
              {obj.title}
            </h1>
            <p className="leading-md text-text-inverse text-[13px] tracking-[0.004rem]">
              {obj.description}
            </p>
            <span className="relative inline-block cursor-pointer text-[13px] text-white after:mt-[1px] after:block after:h-[1px] after:w-full after:bg-white after:content-['']">
              Learn More
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardFooter;
