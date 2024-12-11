import { CirclePlus, Heart, Share } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface BreadCrumbsProps {
  brand: string;
  // label: string[];
  title: string;

  slug: string;
}
const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  // label,
  brand,
  title,

  slug,
}) => {
  // const type = label[0]
  //   .split(" ")
  //   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //   .join(" ");
  const breadCrumbArr = [
    {
      link: "/",
      name: "Home",
    },
    // {
    //   link: `/search?s=${type}`,
    //   name: type,
    // },
    {
      link: `/search?brand=${brand}`,
      name: brand,
    },
    {
      link: `/${slug.slice(0, -6)}`,
      name: title,
    },
  ];
  const breadcrumbs = breadCrumbArr.map((obj, id) => (
    <React.Fragment key={id}>
      <Link to={obj.link}>
        <span
          className={`${obj.name === title ? "cursor-default border-b border-black" : "cursor-pointer opacity-60 transition-all duration-300 ease-in-out hover:opacity-100"}`}
        >
          {obj.name}
        </span>
      </Link>
      <span
        className={`${obj.name === title ? "hidden" : "mx-2 cursor-default text-base"}`}
      >
        /
      </span>
    </React.Fragment>
  ));

  return (
    <div className="flex items-center justify-between py-6">
      <div className="text-[13px]">{breadcrumbs}</div>
      <div className="flex items-center gap-3">
        <CirclePlus className="cursor-pointer" size={22} />
        <Heart className="cursor-pointer" size={22} />
        <Share className="cursor-pointer" size={22} />
      </div>
    </div>
  );
};

export default BreadCrumbs;
