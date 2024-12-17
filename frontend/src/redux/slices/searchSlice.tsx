import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productProps } from "../../@types/userCardTypes";

interface ISearchSlice {
  foundedItems: productProps[];
  isLoading: boolean;
  isSearching: boolean;
  searchValue: string;
  suggestionCountsArr: number[];
  categoryNames: string[];
  selectedSubCategory: string;
  selectedBrand: string;
  selectedGender: string;
  selectedColor: string;
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
  selectedGender: "",
  selectedColor: "",
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
    setSelectedGender: (state, action: PayloadAction<string>) => {
      state.selectedGender = action.payload;
    },
    setSelectedColor: (state, action: PayloadAction<string>) => {
      state.selectedColor = action.payload;
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
  setSelectedGender,
  setSelectedBrand,
  setSelectedColor,
} = searchSlice.actions;
// Экспортируем редьюсер
export default searchSlice.reducer;
