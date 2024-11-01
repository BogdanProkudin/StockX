import ContentLoader from "react-content-loader";

const SearchedItemsListSkeleton = () => {
  return (
    <div className="flex h-full min-w-[965px] flex-col justify-center">
      <ContentLoader
        className="mb-2 rounded-xl"
        speed={0}
        width={500}
        height={30}
        viewBox="0 0 500 30"
        backgroundColor="#e0e0e0"
      >
        <rect x="0" y="0" rx="0" ry="0" width="500" height="30" />
      </ContentLoader>
      <div className="mb-4 h-px w-full bg-gray-300" />

      <ContentLoader
        className="mb-2 rounded-xl"
        speed={0}
        width={500}
        height={30}
        viewBox="0 0 500 30"
        backgroundColor="#e0e0e0"
      >
        <rect x="0" y="0" rx="0" ry="0" width="500" height="30" />
      </ContentLoader>
      <div className="mb-4 h-px w-full bg-gray-300" />

      <ContentLoader
        className="mb-2 rounded-xl"
        speed={0}
        width={500}
        height={30}
        viewBox="0 0 500 30"
        backgroundColor="#e0e0e0"
      >
        <rect x="0" y="0" rx="0" ry="0" width="500" height="30" />
      </ContentLoader>
      <div className="mb-4 h-px w-full bg-gray-300" />

      <ContentLoader
        className="mb-2 rounded-xl"
        speed={0}
        width={500}
        height={30}
        viewBox="0 0 500 30"
        backgroundColor="#e0e0e0"
      >
        <rect x="0" y="0" rx="0" ry="0" width="500" height="30" />
      </ContentLoader>
      <div className="mb-4 h-px w-full bg-gray-300" />

      <div className="mb-6 flex items-center space-x-4">
        <div className="h-28 w-44 rounded-md bg-[#e0e0e0]"></div>{" "}
        <div className="flex flex-col space-y-2">
          <div className="h-6 w-16 rounded bg-[#e0e0e0]"></div>
          <div className="h-6 w-24 rounded bg-[#e0e0e0]"></div>
          <div className="h-6 w-32 rounded bg-[#e0e0e0]"></div>
        </div>
      </div>
      <div className="mb-6 flex items-center space-x-4">
        <div className="h-28 w-44 rounded-md bg-[#e0e0e0]"></div>{" "}
        <div className="flex flex-col space-y-2">
          <div className="h-6 w-16 rounded bg-[#e0e0e0]"></div>
          <div className="h-6 w-24 rounded bg-[#e0e0e0]"></div>
          <div className="h-6 w-32 rounded bg-[#e0e0e0]"></div>
        </div>
      </div>
      <div className="mb-6 flex items-center space-x-4">
        <div className="h-28 w-44 rounded-md bg-[#e0e0e0]"></div>{" "}
        <div className="flex flex-col space-y-2">
          <div className="h-6 w-16 rounded bg-[#e0e0e0]"></div>
          <div className="h-6 w-24 rounded bg-[#e0e0e0]"></div>
          <div className="h-6 w-32 rounded bg-[#e0e0e0]"></div>
        </div>
      </div>
      <div className="mb-6 flex items-center space-x-4">
        <div className="h-28 w-44 rounded-md bg-[#e0e0e0]"></div>{" "}
        <div className="flex flex-col space-y-2">
          <div className="h-6 w-16 rounded bg-[#e0e0e0]"></div>
          <div className="h-6 w-24 rounded bg-[#e0e0e0]"></div>
          <div className="h-6 w-32 rounded bg-[#e0e0e0]"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchedItemsListSkeleton;
