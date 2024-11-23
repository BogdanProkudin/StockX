import ContentLoader from "react-content-loader";

const SearchedItemSkeleton = () => {
  return (
    <div className="mt-5 grid w-full grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-4">
      {[...new Array(20)].map((_, index) => (
        <ContentLoader
          key={index}
          speed={1}
          width={220}
          height={150}
          viewBox="0 0 220 150"
          backgroundColor="hsl(0, 0%, 80%)"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="4" ry="4" width="220" height="150" />
        </ContentLoader>
      ))}
    </div>
  );
};

export default SearchedItemSkeleton;
