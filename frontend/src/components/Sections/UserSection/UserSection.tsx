import React from "react";
import UserCard from "../../Cards/UserCard/UserCard";

import { userCardProps } from "../../../@types/userCardTypes";
import { mainSectionFetch } from "../../../redux/slices/homeItemsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import Skeleton from "../../Cards/UserCard/Skeleton";
const UserSection = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.homeItems);
  React.useEffect(() => {
    dispatch(mainSectionFetch());
  }, []);
  const cardSkeleton = [...new Array(6)].map((_, i) => {
    return <Skeleton key={i} />;
  });
  console.log(data);

  return (
    <div className="mb-20">
      <div className="my-5 flex gap-4">
        <h2 className=" font-bold text-xl ">Recommended For You</h2>
        <span>?</span>
      </div>

      <div className="flex justify-between">
        {status === "loading"
          ? cardSkeleton
          : data
              .slice(0, 6)
              .map((obj: userCardProps, id: number) => (
                <UserCard key={id} {...obj} />
              ))}
      </div>
    </div>
  );
};

export default UserSection;
