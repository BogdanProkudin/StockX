import React from "react";
import SuggestionItem from "./SuggestionItem";

import { createSuggestionNames } from "../../../assets/SearchAssets/SuggestionItemsNames";

const SuggestionItemsList = ({
  suggestionCountsArr,
}: {
  suggestionCountsArr: number[];
}) => {
  const suggestionNames = createSuggestionNames(suggestionCountsArr);
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
