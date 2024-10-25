import React from "react";

import ImageCard from "../../Cards/ImageCard/ImageCard";

const ImageSection: React.FC = () => {
  return (
    <div className="mb-20">
      <h1 className="my-5 font-bold text-xl ">Holiday Gift Guides</h1>

      <div className="flex justify-between">
        <ImageCard />
      </div>
    </div>
  );
};

export default ImageSection;
