import React from "react";
import ContentLoader from "react-content-loader";

const CardSkeleton: React.FC = () => (
  <ContentLoader
    className="rounded-xl"
    speed={1}
    width={1240}
    height={431}
    viewBox="0 0 1240 431"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="16" ry="16" width="820" height="431" />

    <rect x="840" y="0" rx="16" ry="16" width="400" height="431" />
  </ContentLoader>
);

export default CardSkeleton;
