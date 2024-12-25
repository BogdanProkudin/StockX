import ContentLoader from "react-content-loader";

const SizeSkeleton = () => (
  <ContentLoader
    speed={1}
    width={480}
    height={42}
    viewBox="0 0 480 42"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="480" height="42" />
  </ContentLoader>
);

export default SizeSkeleton;
