import { CirclePlus, Heart, Share } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
interface BreadCrumbsProps {
  brand: string;
  label: string[];
  title: string;
  slug: string;
}
const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  label,
  brand,
  title,
  slug,
}) => {
  console.log(label);
  const type = label[0]
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <div className="flex items-center justify-between py-6">
      <div className="text-[13px]">
        <Link to={"/"}>
          <span className="cursor-pointer opacity-60 transition-all duration-300 ease-in-out hover:opacity-100">
            Home
          </span>
        </Link>
        <span className="mx-2 text-base">/</span>
        <Link to={"/"}>
          <span className="cursor-pointer opacity-60 transition-all duration-300 ease-in-out hover:opacity-100">
            {type}
          </span>
        </Link>
        <span className="mx-2 text-base">/</span>
        <Link to={`/${slug}`}>
          <span className="cursor-pointer opacity-60 transition-all duration-300 ease-in-out hover:opacity-100">
            {brand}
          </span>
        </Link>
        <span className="mx-2 text-base">/</span>
        <Link to={`/${slug}`}>
          <span className="cursor-default border-b border-black">{title}</span>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <CirclePlus className="cursor-pointer" size={22} />
        <Heart className="cursor-pointer" size={22} />
        <Share className="cursor-pointer" size={22} />
      </div>
    </div>
  );
};

export default BreadCrumbs;
