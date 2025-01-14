import ContentLoader from "react-content-loader";

const SubTitleSkeleton = () => (
  <ContentLoader
    speed={1}
    width={350}
    height={25}
    viewBox="0 0 350 25"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="5" rx="0" ry="0" width="350" height="15" />
  </ContentLoader>
);

export default SubTitleSkeleton;
