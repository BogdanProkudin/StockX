import ContentLoader from "react-content-loader";

const InfoBlockSkeleton = () => (
  <ContentLoader
    speed={1}
    width={480}
    height={180}
    viewBox="0 0 480 180"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="116" y="25" rx="0" ry="0" width="260" height="20" />
    <rect x="0" y="55" rx="0" ry="0" width="480" height="53" />
    <rect x="0" y="115" rx="0" ry="0" width="480" height="53" />
  </ContentLoader>
);

export default InfoBlockSkeleton;
