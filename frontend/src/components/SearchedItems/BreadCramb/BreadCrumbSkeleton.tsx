import ContentLoader from "react-content-loader";

const BreadCrumbSkeleton = () => (
  <ContentLoader
    speed={1}
    width={50}
    height={19}
    viewBox="0 0 50 19"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="4" ry="4" width="50" height="19" />
  </ContentLoader>
);

export default BreadCrumbSkeleton;
