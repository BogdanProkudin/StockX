import React from "react";
import { useAppSelector } from "../../../redux/hook";
import TitleSkeleton from "../TitleSkeleton";

const InstagramSection = () => {
  const instagramSectionItems = useAppSelector(
    (state) => state.homeItems.instagramSectionItems,
  );
  console.log(instagramSectionItems);

  return (
    <div className="mb-20">
      <h1 className="text-xl font-bold">
        {instagramSectionItems.length < 1 ? (
          <TitleSkeleton />
        ) : (
          "As Seen On Instagram"
        )}
      </h1>
      <div className="flex justify-between">
        {instagramSectionItems.length > 0 && (
          <>
            {instagramSectionItems.map((obj, id) => (
              <div key={id}>
                <img src={obj.image} key={id} className="rounded-2xl" alt="" />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default InstagramSection;
