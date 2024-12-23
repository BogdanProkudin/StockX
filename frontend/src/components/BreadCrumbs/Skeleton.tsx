import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={1}
    width={1120}
    height={72}
    viewBox="0 0 1120 72"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="24" rx="0" ry="0" width="375" height="27" />
    <rect x="1030" y="24" rx="0" ry="0" width="90" height="27" />
  </ContentLoader>
);

export default Skeleton;
