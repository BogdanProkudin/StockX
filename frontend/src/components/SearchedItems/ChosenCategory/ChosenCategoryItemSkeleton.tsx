import ContentLoader from "react-content-loader";

const ChosenCategorySkeleton = ({ children, ...props }: any) => (
  <div className="flex items-center justify-center">
    <ContentLoader
      speed={1}
      width={70}
      height={15}
      viewBox="0 0 70 15"
      backgroundColor="hsl(0, 0%, 80%)"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="4" ry="4" width="70" height="15" />
    </ContentLoader>
  </div>
);

export default ChosenCategorySkeleton;
