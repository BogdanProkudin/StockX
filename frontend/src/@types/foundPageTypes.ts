export interface FoundItem {
  id: string;
  image: string;
  brand: string;
  title: string;
  color: string;
}

export interface SuggestionItem {
  name: string;
  count: number;
}

export interface SearchState {
  isLoading: boolean;
  foundedItems: FoundItem[];
  suggestionCountsArr: number[];
  searchValue: string;
}