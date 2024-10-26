import React from "react";
import { cardAssetsProps } from "../../../assets/ImgSection/ImgSection";
import { Link } from "react-router-dom";

const ImageCard: React.FC<cardAssetsProps> = ({ img, path, alt }) => {
  return (
    <Link to={path} className="w-[234px] h-[160px]">
      <img className="rounded-xl" src={img} alt={alt} />
    </Link>
  );
};

export default ImageCard;
