import React from "react";
import ContentLoader from "react-content-loader";

const ImageSkeleton: React.FC = () => (
  <ContentLoader
    className="rounded-xl"
    speed={1}
    width={240}
    height={160}
    viewBox="0 0 240 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="240" height="160" />
  </ContentLoader>
);

export default ImageSkeleton;
