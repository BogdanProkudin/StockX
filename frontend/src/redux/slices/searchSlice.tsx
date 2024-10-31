import { createSlice } from "@reduxjs/toolkit";
import { userCardProps } from "../../@types/userCardTypes";
interface ISearchSlice {
  foundedItems: userCardProps[];
}
const initialState: ISearchSlice = {
  foundedItems: [],
};
const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    // Дополнительные редьюсеры для работы с состоянием, если нужны
  },
});

// Экспортируем редьюсер
export default searchSlice.reducer;
