import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { userCardProps } from "../../../@types/userCardTypes";

const UserCard: React.FC<userCardProps> = ({ title, image }) => {
  return (
    <div className="flex flex-col">
      <button>
        <FavoriteBorderIcon />
      </button>
      <img src={image} alt="" />
      <h4>{title}</h4>
      <p>Lowest Ask</p>
      <b>€ 83</b>
      <span>Xpress Ship</span>
    </div>
  );
};

export default UserCard;
