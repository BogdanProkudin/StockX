type SuggestionName = {
  name: string;
  path: string;
  count: number;
};

export const createSuggestionNames = (
  suggestionCountsArr: number[],
): SuggestionName[] => {
  return [
    { name: "sneakers", path: "", count: suggestionCountsArr[0] || 0 },
    { name: "apparel", path: "", count: suggestionCountsArr[1] || 0 },
    { name: "accessories", path: "", count: suggestionCountsArr[2] || 0 },
    { name: "shoes", path: "", count: suggestionCountsArr[3] || 0 },
  ];
};
