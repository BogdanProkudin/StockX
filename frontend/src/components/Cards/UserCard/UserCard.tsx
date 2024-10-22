import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "../../../axiosConfig/axios";

interface userCardProps {
  cardInfo: any;
}
const UserCard: React.FC = ({ cardInfo }) => {
  return (
    <div className="flex flex-col">
      <button>
        <FavoriteBorderIcon />
      </button>
      <img src="" alt="" />
      <h4>Nike Air Force 1 Low '07 White</h4>
      <p>Lowest Ask</p>
      <b>€83</b>
      <span>Xpress Ship</span>
    </div>
  );
};

export default UserCard;
