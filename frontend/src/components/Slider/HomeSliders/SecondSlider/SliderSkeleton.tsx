import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
  <ContentLoader
    className="rounded-xl"
    speed={1}
    width={1240}
    height={384}
    viewBox="0 0 1240 384"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="16" ry="16" width="1240" height="384" />
  </ContentLoader>
);

export default Skeleton;
