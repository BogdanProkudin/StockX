import ContentLoader from "react-content-loader";

const SearchedItemSkeleton = () => {
  return (
    <div className="mediumScreen:grid-cols-2 mediumLargeScreen:grid-cols-3 mt-5 grid w-full grid-cols-4 items-start gap-6">
      {[...new Array(20)].map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <ContentLoader
            speed={1}
            width="100%"
            height={120}
            viewBox="0 0 100% 120"
            backgroundColor="hsl(0, 0%, 80%)"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="100%" height="120" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width="80%"
            height={20}
            viewBox="0 0 80% 20"
            backgroundColor="hsl(0, 0%, 80%)"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="80%" height="20" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width="70%"
            height={20}
            viewBox="0 0 70% 20"
            backgroundColor="hsl(0, 0%, 80%)"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="70%" height="20" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width="65%"
            height={20}
            viewBox="0 0 65% 20"
            backgroundColor="hsl(0, 0%, 80%)"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="65%" height="20" />
          </ContentLoader>
        </div>
      ))}
    </div>
  );
};

export default SearchedItemSkeleton;
