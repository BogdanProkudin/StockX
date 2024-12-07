import React from "react";

const SuggestionItem = ({ name, count }: { name: string; count: number }) => {
  return (
    <>
      <span className="flex items-center justify-center">
        <b className="text-lg">{count}</b>
        <b className="pr-0.5 text-lg">+ </b>
        result found in <b className="pl-1 text-lg">{name}</b>
      </span>
    </>
  );
};

export default React.memo(SuggestionItem);
