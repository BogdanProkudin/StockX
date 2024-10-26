import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig/axios";
import { fetchRequest } from "../../@types/status";

interface IState {
  status: fetchRequest;
  mainStatus: fetchRequest;
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
  mainItems: {
    data: [];
    description: string;
    title: string;
  };
}

const initialState: IState = {
  status: fetchRequest.LOADING,
  mainStatus: fetchRequest.LOADING,
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
  mainItems: {
    data: [],
    description: "",
    title: "",
  },
};

export const userSectionFetch = createAsyncThunk(
  "userSectionFetch",
  async () => {
    try {
      const res = await axios.get("/getUserItems");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const mainSectionFetch = createAsyncThunk(
  "mainSectionFetch",
  async (section) => {
    try {
      const res = await axios.post("/getMainSection", { count: 1 });
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
      .addCase(userSectionFetch.pending, (state) => {
        state.status = fetchRequest.LOADING;
        state.recentlyViewedItems = {
          data: [],
          description: "",
          title: "",
        };
        state.recomendedItems = { data: [], title: "", description: "" };
      })
      .addCase(userSectionFetch.rejected, (state) => {
        state.status = fetchRequest.ERROR;
        state.recentlyViewedItems = { data: [], title: "", description: "" };
        state.recomendedItems = { data: [], title: "", description: "" };
      })
      .addCase(userSectionFetch.fulfilled, (state, action) => {
        state.status = fetchRequest.SUCCESS;
        state.recentlyViewedItems = action.payload.recentlyViewed;
        state.recomendedItems = action.payload.featuredItems;
      })
      .addCase(mainSectionFetch.pending, (state) => {
        state.mainStatus = fetchRequest.LOADING;
        state.mainItems = { data: [], title: "", description: "" };
      })
      .addCase(mainSectionFetch.rejected, (state) => {
        state.mainStatus = fetchRequest.ERROR;
      })
      .addCase(mainSectionFetch.fulfilled, (state, action) => {
        state.mainStatus = fetchRequest.SUCCESS;
        state.mainItems = action.payload;
      });
  },
});
export default homeItemSlice.reducer;
