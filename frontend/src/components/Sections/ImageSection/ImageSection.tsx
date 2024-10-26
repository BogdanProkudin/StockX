import React from "react";
import ImageCard from "../../Cards/ImageCard/ImageCard";
import { cardAssets } from "../../../assets/ImgSection/ImgSection";

const ImageSection: React.FC = () => {
  return (
    <div className="mb-10">
      <h1 className="my-5 font-bold text-xl ">Holiday Gift Guides</h1>

      <div className="flex justify-between">
        {cardAssets.map((obj, id) => (
          <ImageCard key={id} {...obj} />
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
