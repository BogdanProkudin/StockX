import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig/axios";
import { fetchRequest } from "../../@types/status";

interface IinitialState {
  favoriteList: {
    title: string;
    data: { titleList: string; data: [] }[];
  };
  favoriteListStatus: fetchRequest;
}
const initialState: IinitialState = {
  favoriteList: {
    title: "All Favorites",
    data: [],
  },
  favoriteListStatus: fetchRequest.INITIAL,
};
export const fetchFavoriteList = createAsyncThunk(
  "favorite/fetchFavoriteList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/getFavoriteList");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.data);
    }
  },
);
export const createNewList = createAsyncThunk(
  "favorite/createNewList",
  async (titleList: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/createNewList", { titleList });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.data);
    }
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
      })
      .addCase(createNewList.pending, (state) => {
        state.favoriteListStatus = fetchRequest.LOADING;
      })
      .addCase(createNewList.fulfilled, (state, action) => {
        state.favoriteListStatus = fetchRequest.SUCCESS;
        state.favoriteList = action.payload;
      })
      .addCase(createNewList.rejected, (state) => {
        state.favoriteListStatus = fetchRequest.ERROR;
        state.favoriteList = {
          title: "All Favorites",
          data: [],
        };
      });
  },
});
export default favoriteSlice.reducer;
