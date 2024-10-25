import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig/axios";
import { fetchRequest } from "../../@types/status";

interface IState {
  status: fetchRequest;
  data: [];
}

const initialState: IState = {
  status: fetchRequest.LOADING,
  data: [],
};

export const mainSectionFetch = createAsyncThunk(
  "mainSectionFetch",
  async () => {
    try {
      const res = await axios.get("/getShoes");
      return res.data.hits;
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
        state.data = [];
      })
      .addCase(mainSectionFetch.rejected, (state) => {
        state.status = fetchRequest.ERROR;
        state.data = [];
      })
      .addCase(mainSectionFetch.fulfilled, (state, action) => {
        state.status = fetchRequest.SUCCESS;
        state.data = action.payload;
      });
  },
});
export default homeItemSlice.reducer;
