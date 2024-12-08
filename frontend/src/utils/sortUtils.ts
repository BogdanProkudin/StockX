import { SearchItem } from "../types/searchTypes";

type SortFunction = (a: SearchItem, b: SearchItem) => number;

const sortFunctions: Record<string, SortFunction> = {
  priceAsc: (a, b) => Math.floor(a.avg_price) - Math.floor(b.avg_price),
  priceDesc: (a, b) => Math.floor(b.avg_price) - Math.floor(a.avg_price),
  releaseDate: (a, b) => {
    const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
    const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
    return dateB - dateA;
  },
  alphabetical: (a, b) => a.title.localeCompare(b.title),
};

export const sortItems = (
  items: SearchItem[],
  sortType: string | null,
): SearchItem[] => {
  if (!sortType || !sortFunctions[sortType]) {
    return items;
  }

  return [...items].sort(sortFunctions[sortType]);
};
