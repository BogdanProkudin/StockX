import { createSlice } from "@reduxjs/toolkit";
import { userCardProps } from "../../@types/userCardTypes";
interface ISearchSlice {
  foundedItems: userCardProps[];
  isLoading: boolean;
  searchValue: string;
  suggestionCountsArr: number[];
}
const initialState: ISearchSlice = {
  foundedItems: [],
  isLoading: false,
  searchValue: "",
  suggestionCountsArr: [],
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
    // Дополнительные редьюсеры для работы с состоянием, если нужны
  },
});
export const {
  setFoundedItems,
  setIsLoading,
  setSearchValue,
  setSuggestionCountsArr,
} = searchSlice.actions;
// Экспортируем редьюсер
export default searchSlice.reducer;
