import React from "react";
import UserCard from "../../Cards/MainCard/MainCard";

import { userCardProps } from "../../../@types/userCardTypes";

import TitleSkeleton from "../TitleSkeleton";

import Skeleton from "../../Cards/MainCard/Skeleton";
import { useAppSelector } from "../../../redux/hook";
import { Link } from "react-router-dom";

import { ArrowRight } from "lucide-react";

interface UserSectionProps {
  mainTitle: string;
  items: userCardProps[];
  description: string;
}

const MainSection: React.FC<UserSectionProps> = ({
  mainTitle,
  items,
  description,
}) => {
  const { status } = useAppSelector((state) => state.homeItems);
  const cardSkeleton = [...new Array(6)].map((_, i) => {
    return <Skeleton key={i} />;
  });
  return (
    <div className="mb-20">
      <div className="my-5 flex justify-between items-center">
        <div className="flex gap-3 items-center relative">
          <h1 className=" font-bold text-xl ">
            {status === "loading" ? <TitleSkeleton /> : mainTitle}
          </h1>
          <span className=" group text-sm px-[6px] py-[1px]  cursor-pointer relative  bg-black text-white rounded-full  ">
            <div className="absolute hidden z-10 w-[250px] group-hover:block bg-gray-800 text-white text-sm rounded-lg px-3 py-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2 ">
              {description}
              <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
            </div>
            ?
          </span>
        </div>
        {status === "loading" ? (
          <TitleSkeleton />
        ) : (
          <Link
            to={""}
            className="text-green-900 font-bold flex items-center gap-2 transition-colors duration-300 px-2 py-1 rounded-full hover:bg-slate-200"
          >
            See All
            <ArrowRight size={20} />
          </Link>
        )}
      </div>

      <div className="flex justify-between">
        {status === "loading"
          ? cardSkeleton
          : items.map((obj: userCardProps, id: number) => (
              <UserCard key={id} {...obj} />
            ))}
      </div>
    </div>
  );
};

export default MainSection;