import React from "react";
import ContentLoader from "react-content-loader";

const LastPriceSkeleton = () => (
  <ContentLoader
    speed={1}
    width={40}
    height={23}
    viewBox="0 0 40 23"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="40" height="23" />
  </ContentLoader>
);

export default LastPriceSkeleton;
