import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userCardProps } from "../../@types/userCardTypes";
interface ISearchSlice {
  foundedItems: userCardProps[];
  isLoading: boolean;
  isSearching: boolean;
  searchValue: string;
  suggestionCountsArr: number[];
  categoryNames: string[];
  selectedSubCategory: string;
  selectedBrand: string;
}
const initialState: ISearchSlice = {
  foundedItems: [],
  isLoading: false,
  searchValue: "",
  isSearching: false,
  suggestionCountsArr: [],
  categoryNames: [],
  selectedSubCategory: "",
  selectedBrand: "",
};
const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setFoundedItems: (state, actions) => {
      state.foundedItems = actions.payload.data;
    },
    setIsLoading: (state, actions) => {
      state.isLoading = actions.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSuggestionCountsArr: (state, action) => {
      state.suggestionCountsArr = action.payload.suggestionCountList;
    },
    setCategoryNames: (state, action) => {
      state.categoryNames = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    setSelectedSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload;
    },
    setSelectedBrand: (state, action: PayloadAction<string>) => {
      state.selectedBrand = action.payload;
    },
    // Дополнительные редьюсеры для работы с состоянием, если нужны
  },
});
export const {
  setFoundedItems,
  setIsLoading,
  setSearchValue,
  setSuggestionCountsArr,
  setCategoryNames,
  setIsSearching,
  setSelectedSubCategory,
  setSelectedBrand,
} = searchSlice.actions;
// Экспортируем редьюсер
export default searchSlice.reducer;
