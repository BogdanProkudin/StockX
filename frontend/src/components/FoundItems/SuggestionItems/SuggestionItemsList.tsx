import React, { useEffect } from "react";
import SuggestionItem from "./SuggestionItem";
import { useGetSuggestionCountQuery } from "../../../redux/api/mainApiSlice";
import { useAppSelector } from "../../../redux/hook";

const SuggestionItemsList = ({
  suggestionCountsArr,
}: {
  suggestionCountsArr: number[];
}) => {
  const suggestionNames = [
    { name: "sneakers", path: "", count: suggestionCountsArr[0] },
    { name: "apparel", path: "", count: suggestionCountsArr[1] },
    { name: "accessories", path: "", count: suggestionCountsArr[2] },
    { name: "shoes", path: "", count: suggestionCountsArr[3] },
  ];
  return (
    <div className="flex w-full flex-col">
      {suggestionNames.map((suggest) => {
        return (
          <div
            key={suggest.name}
            className="flex h-14 w-full cursor-pointer items-center justify-between border-b-2 border-b-lightGray p-4 transition-all duration-100 hover:border-r-[10px] hover:border-r-green-900"
          >
            <SuggestionItem name={suggest.name} count={suggest.count} />
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(SuggestionItemsList);
