import ContentLoader from "react-content-loader";

const SearchedItemSkeleton = () => {
  return (
    <div className="mt-5 grid w-full grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-4">
      {[...new Array(20)].map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <ContentLoader
            speed={1}
            width={220}
            height={120}
            viewBox="0 0 220 120"
            backgroundColor="hsl(0, 0%, 80%)"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="220" height="120" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width={180}
            height={20}
            viewBox="0 0 180 20"
            backgroundColor="hsl(0, 0%, 80%)"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="180" height="20" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width={130}
            height={20}
            viewBox="0 0 130 20"
            backgroundColor="hsl(0, 0%, 80%)"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="130" height="20" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width={90}
            height={20}
            viewBox="0 0 90 20"
            backgroundColor="hsl(0, 0%, 80%)"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="90" height="20" />
          </ContentLoader>
        </div>
      ))}
    </div>
  );
};

export default SearchedItemSkeleton;
