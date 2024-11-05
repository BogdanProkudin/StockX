import React from "react";
import ImageCard from "../../Cards/ImageCard/ImageCard";
import { cardAssetsProps } from "../../../assets/ImgSection/ImgSection";

interface ImageSectionProps {
  cardAssets: cardAssetsProps[];
}
const ImageSection: React.FC<ImageSectionProps> = ({ cardAssets }) => {
  return (
    <div className="mb-10">
      <h1 className="my-5 text-xl font-bold">Holiday Gift Guides</h1>

      <div className="flex justify-between">
        {cardAssets.map((obj: cardAssetsProps, id: number) => (
          <ImageCard key={id} {...obj} />
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
