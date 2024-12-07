import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={1}
    width={191}
    height={300}
    viewBox="0 0 191 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="191" height="150" />
    <rect x="0" y="160" rx="0" ry="0" width="191" height="40" />
    <rect x="0" y="205" rx="0" ry="0" width="121" height="20" />
    <rect x="0" y="230" rx="0" ry="0" width="101" height="30" />
    <rect x="0" y="265" rx="0" ry="0" width="121" height="20" />
  </ContentLoader>
);

export default Skeleton;
