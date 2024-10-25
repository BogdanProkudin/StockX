import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { userCardProps } from "../../../@types/userCardTypes";
import { Link } from "react-router-dom";

const UserCard: React.FC<userCardProps> = ({
  image,
  title,
  base_price,
  min_price,
}) => {
  const onClickFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };
  return (
    <Link
      to=""
      className=" w-[190px] h-[250px] relative flex flex-col items-center  cursor-pointer"
    >
      <button onClick={onClickFavorite} className="absolute right-5">
        <FavoriteBorderIcon />
      </button>
      <img
        className="w-[160px] h-[140px] min-h-[140px] p-4"
        src={image}
        alt=""
      />
      <div className="px-4 py-0">
        <h4 className="mb-1">{title}</h4>
        <p className=" text-gray-400 text-sm">Lowest Ask</p>
        <b className=" font-mono text-[23px] f">€{base_price}</b>
        <p className="text-xs bg-gray-100 p-1 w-4/5">min price: €{min_price}</p>
      </div>
    </Link>
  );
};

export default UserCard;
