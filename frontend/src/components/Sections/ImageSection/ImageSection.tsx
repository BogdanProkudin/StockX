import React from "react";
import ImageCard from "../../Cards/ImageCard/ImageCard";
import { cardAssetsProps } from "../../../assets/ImgSection/ImgSection";
import ImageSkeleton from "./ImageSkeleton";
import TitleSkeleton from "../TitleSkeleton";

interface ImageSectionProps {
  title: string;
  cardAssets: cardAssetsProps[];
}
const ImageSection: React.FC<ImageSectionProps> = ({ cardAssets, title }) => {
  const skeleton = [...new Array(5)].map((_, i) => <ImageSkeleton key={i} />);
  return (
    <div className="mb-10">
      <h1 className="my-5 text-xl font-bold">
        {cardAssets.length < 2 ? <TitleSkeleton /> : title}
      </h1>

      <div className="flex justify-between">
        {cardAssets.length < 2 ? (
          skeleton
        ) : (
          <>
            {cardAssets.map((obj: cardAssetsProps, id: number) => (
              <ImageCard key={id} {...obj} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
