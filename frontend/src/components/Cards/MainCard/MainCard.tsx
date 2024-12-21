import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { Link } from "react-router-dom";

interface ProductCardProps {
  id?: string;
  image: string;
  slug: string;
  title: string;
  avg_price: number;
  min_price: number;
}
const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  slug,
  title,
  avg_price,
  min_price,
}) => {
  const onClickFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };
  // const formattedUrl = slug.slice(0, -6);
  const price = Math.round(avg_price);

  return (
    <Link
      to={`/${id}`}
      className="relative flex h-full w-[190px] cursor-pointer flex-col items-center"
    >
      <button onClick={onClickFavorite} className="absolute right-5">
        <FavoriteBorderIcon />
      </button>
      <img
        className="h-[140px] min-h-[140px] w-[160px] p-4"
        src={image}
        alt=""
      />
      <div className="px-4 py-0">
        <h4 className="mb-1 max-h-[96px] overflow-hidden text-ellipsis">
          {title}
        </h4>
        <p className="text-sm text-gray-400">Lowest Ask</p>
        <b className="f font-mono text-[23px]">€{price}</b>
        <p className="w-4/5 bg-gray-100 p-1 text-xs">min price: €{min_price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
