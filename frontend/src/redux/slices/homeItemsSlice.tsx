import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig/axios";
import { fetchRequest } from "../../@types/status";
interface ISection {
  data: [];
  description: string;
  title: string;
}
interface IState {
  status: fetchRequest;
  mainStatus: fetchRequest;
  recentlyViewedItems: ISection;
  recomendedItems: ISection;
  mainSection: Array<{ status: fetchRequest; data: ISection }>;
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
  mainSection: Array(3).fill({
    status: fetchRequest.LOADING,
    data: { data: [], title: "", description: "" },
  }),
};

export const userSectionFetch = createAsyncThunk(
  "userSectionFetch",
  async () => {
    try {
      const res = await axios.get("/getShoes");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const mainSectionFetch = createAsyncThunk(
  "mainSectionFetch",
  async (section: number) => {
    try {
      const res = await axios.post("/getMainSection", { count: section });
      return { data: res.data, section };
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
      .addCase(mainSectionFetch.pending, (state, action) => {
        const section = action.meta.arg;

        state.mainSection[section] = {
          status: fetchRequest.LOADING,
          data: { data: [], title: "", description: "" },
        };
      })
      .addCase(mainSectionFetch.rejected, (state, action) => {
        const section = action.meta.arg;

        state.mainSection[section] = {
          status: fetchRequest.ERROR,
          data: { data: [], title: "", description: "" },
        };
      })
      .addCase(mainSectionFetch.fulfilled, (state, action) => {
        if (action.payload) {
          const section = action.meta.arg;
          const sectionData = action.payload.data;
          state.mainSection[section] = {
            status: fetchRequest.SUCCESS,
            data: sectionData,
          };
        }
      });
  },
});
export default homeItemSlice.reducer;
