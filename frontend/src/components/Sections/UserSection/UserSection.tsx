import React from "react";
import ProductCard from "../../Cards/MainCard/MainCard";

import { productProps } from "../../../@types/userCardTypes";

import TitleSkeleton from "../TitleSkeleton";

import Skeleton from "../../Cards/MainCard/Skeleton";

interface UserSectionProps {
  mainTitle: string;
  items: productProps[];
  description: string;
}

const UserSection: React.FC<UserSectionProps> = ({
  mainTitle,
  items,
  description,
}) => {
  const cardSkeleton = [...new Array(6)].map((_, i) => {
    return <Skeleton key={i} />;
  });
  return (
    <div className="mb-5">
      <div className="relative my-3 flex items-center gap-3">
        {mainTitle.length < 1 ? (
          <TitleSkeleton />
        ) : (
          <>
            <h1 className="text-xl font-bold">{mainTitle}</h1>
            <span className="group relative cursor-pointer rounded-full bg-black px-[6px] py-[1px] text-sm text-white">
              <div className="absolute bottom-full left-1/2 z-10 mb-2 hidden w-[250px] -translate-x-1/2 transform rounded-lg bg-gray-800 px-3 py-2 text-sm text-white group-hover:block">
                {description}
                <div className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 transform bg-gray-800"></div>
              </div>
              ?
            </span>
          </>
        )}
      </div>

      <div className="flex justify-between">
        {mainTitle.length < 1
          ? cardSkeleton
          : items.map((obj: productProps, id: number) => (
              <ProductCard key={id} {...obj} />
            ))}
      </div>
    </div>
  );
};

export default UserSection;
