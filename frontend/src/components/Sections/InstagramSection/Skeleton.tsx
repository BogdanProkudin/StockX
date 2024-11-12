import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={1}
    width={1240}
    height={292}
    viewBox="0 0 1240 292"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect
      className="rounded-2xl"
      x="0"
      y="0"
      rx="0"
      ry="0"
      width="292"
      height="292"
    />
    <rect
      className="rounded-2xl"
      x="302"
      y="0"
      rx="0"
      ry="0"
      width="292"
      height="292"
    />
    <rect
      className="rounded-2xl"
      x="604"
      y="0"
      rx="0"
      ry="0"
      width="292"
      height="292"
    />
    <rect
      className="rounded-2xl"
      x="906"
      y="0"
      rx="0"
      ry="0"
      width="292"
      height="292"
    />
    <rect
      className="rounded-2xl"
      x="1208"
      y="0"
      rx="0"
      ry="0"
      width="32"
      height="292"
    />
  </ContentLoader>
);

export default Skeleton;
