import React from "react";
import { cardAssetsProps } from "../../../assets/ImgSection/ImgSection";
import { Link } from "react-router-dom";

const ImageCard: React.FC<cardAssetsProps> = ({ img, path, alt }) => {
  return (
    <Link to={path} className="h-[160px] w-[234px]">
      <img className="rounded-xl" src={img} alt={alt} />
    </Link>
  );
};

export default ImageCard;
