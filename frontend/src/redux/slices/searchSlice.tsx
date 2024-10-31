import { createSlice } from "@reduxjs/toolkit";
import { userCardProps } from "../../@types/userCardTypes";
interface ISearchSlice {
  foundedItems: userCardProps[];
  isLoading: boolean;
}
const initialState: ISearchSlice = {
  foundedItems: [],
  isLoading: false,
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
    // Дополнительные редьюсеры для работы с состоянием, если нужны
  },
});
export const { setFoundedItems, setIsLoading } = searchSlice.actions;
// Экспортируем редьюсер
export default searchSlice.reducer;
