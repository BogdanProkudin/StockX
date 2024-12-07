import React from 'react';
import ContentLoader from 'react-content-loader';

interface ChosenCategorySkeletonProps {
  categoryName: string;
}

const ChosenCategorySkeleton: React.FC<ChosenCategorySkeletonProps> = ({ categoryName }) => {
  const isClearAll = categoryName === 'Clear All';

  return (
    <div
      className="
        text-text-primary inline-flex h-[30px] min-h-[22px] min-w-[20px] max-w-full
        items-center justify-center rounded-2xl bg-categoryButtonColor
        px-3 py-2 font-sans text-sm font-normal leading-tight shadow
        outline-2 outline-offset-2 mb-1 mr-1 mt-1
      "
    >
      {isClearAll ? (
        <span className="text-center text-sm text-blackTextColor">Clear All</span>
      ) : (
        <ContentLoader
          speed={1.5}
          width={70}
          height={15}
          viewBox="0 0 70 15"
          backgroundColor="hsl(0, 0%, 90%)"
          foregroundColor="hsl(0, 0%, 95%)"
          className="transform scale-90"
        >
          <rect x="0" y="0" rx="6" ry="6" width="70" height="15" />
        </ContentLoader>
      )}
    </div>
  );
};

ChosenCategorySkeleton.displayName = 'ChosenCategorySkeleton';

export default React.memo(ChosenCategorySkeleton);
