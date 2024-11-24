import ContentLoader from "react-content-loader";

const ChosenCategorySkeleton = ({ categoryName }: { categoryName: string }) => (
  <button className="text-text-primary mb-1 mr-1 mt-1 inline-flex h-[30px] min-h-[22px] min-w-[20px] max-w-full cursor-pointer items-center justify-center rounded-2xl bg-categoryButtonColor px-2 py-2 pl-3 pr-3 align-top font-sans text-sm text-xs font-normal leading-tight shadow outline-2 outline-offset-2">
    <span className="text-center text-sm text-blackTextColor">
      {categoryName}
    </span>

    {categoryName !== "Clear All" && (
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
    )}
  </button>
);

export default ChosenCategorySkeleton;
