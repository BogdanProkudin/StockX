import { CirclePlus, Heart, Share } from "lucide-react";
import React from "react";
interface BreadCrumbsProps {
  category: string;
  title: string;
}
const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ category, title }) => {
  return (
    <div className="flex items-center justify-between py-6">
      <div className="text-sm">
        Home / Apparel / Tops / T-Shirts / Supreme / Supreme Jordan Biggie S S
        Top Black
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
