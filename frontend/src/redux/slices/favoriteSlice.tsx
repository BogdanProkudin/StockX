import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig/axios";
import { fetchRequest } from "../../@types/status";

interface IinitialState {
  favoriteList: {
    title: string;
    data: [];
  };
  favoriteListStatus: fetchRequest;
}
const initialState: IinitialState = {
  favoriteList: {
    title: "All Favorites",
    data: [],
  },
  favoriteListStaos: fetchRequest.INITIAL,
};
export const fetchFavoriteList = createAsyncThunk(
  "favorite/fetchFavoriteList",
  async () => {
    const { data } = await axios.post("/getFavoriteList", {
      token: localStorage.getItem("token"),
    });
    return data;
  },
);
export const addToFavorite = createAsyncThunk(
  "favorite/addToFavorite",
  async (dataProduct) => {
    const { data } = await axios.post("/addToFavoriteList", dataProduct);
    return data;
  },
);
const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteList.pending, (state) => {
        state.favoriteListStatus = fetchRequest.LOADING;
        state.favoriteList = {
          title: "All Favorites",
          data: [],
        };
      })
      .addCase(fetchFavoriteList.fulfilled, (state, action) => {
        state.favoriteListStatus = fetchRequest.SUCCESS;
        state.favoriteList = action.payload;
      })
      .addCase(fetchFavoriteList.rejected, (state) => {
        state.favoriteListStatus = fetchRequest.ERROR;
        state.favoriteList = {
          title: "All Favorites",
          data: [],
        };
      });
  },
});
export default favoriteSlice.reducer;
