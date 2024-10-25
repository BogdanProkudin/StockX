import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig/axios";
import { fetchRequest } from "../../@types/status";

interface IState {
  status: fetchRequest;
  recentlyViewedItems: {
    data: [];
    description: string;
    title: string;
  };
  recomendedItems: {
    data: [];
    description: string;
    title: string;
  };
}

const initialState: IState = {
  status: fetchRequest.LOADING,
  recentlyViewedItems: {
    data: [],
    description: "",
    title: "",
  },
  recomendedItems: {
    data: [],
    description: "",
    title: "",
  },
};

export const mainSectionFetch = createAsyncThunk(
  "mainSectionFetch",
  async () => {
    try {
      const res = await axios.get("/userSection");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const homeItemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(mainSectionFetch.pending, (state) => {
        state.status = fetchRequest.LOADING;
        state.recentlyViewedItems = {
          data: [],
          description: "",
          title: "",
        };
        state.recomendedItems = { data: [], title: "", description: "" };
      })
      .addCase(mainSectionFetch.rejected, (state) => {
        state.status = fetchRequest.ERROR;
        state.recentlyViewedItems = { data: [], title: "", description: "" };
        state.recomendedItems = { data: [], title: "", description: "" };
      })
      .addCase(mainSectionFetch.fulfilled, (state, action) => {
        state.status = fetchRequest.SUCCESS;
        state.recentlyViewedItems = action.payload.recentlyViewed;
        state.recomendedItems = action.payload.featuredItems;
      });
  },
});
export default homeItemSlice.reducer;
