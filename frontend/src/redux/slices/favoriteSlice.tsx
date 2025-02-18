import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig/axios";
import { fetchRequest } from "../../@types/status";

type productDataType = {
  id: string | undefined;
  title: string;
  image: string;
  price: number;
  min_price: number;
  size: string[];
};
interface addToList {
  titleList: string[];
  productData: productDataType;
}
interface IinitialState {
  favoriteList: { titleList: string; data: [] }[];
  favoriteListStatus: fetchRequest;
  productAdded: {
    text: string;
    checked: boolean;
  };
}
const initialState: IinitialState = {
  favoriteList: [
    {
      titleList: "",
      data: [],
    },
  ],
  favoriteListStatus: fetchRequest.INITIAL,
  productAdded: {
    text: "",
    checked: false,
  },
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
export const productAddToList = createAsyncThunk(
  "favorite/addToList",
  async ({ titleList, productData }: addToList, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/addToList`, {
        titleList,
        productData,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.data);
    }
  },
);
const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setProductAdded: (state) => {
      state.productAdded = {
        text: "",
        checked: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteList.pending, (state) => {
        state.favoriteListStatus = fetchRequest.LOADING;
        state.favoriteList = [
          {
            titleList: "All Favorites",
            data: [],
          },
        ];
      })
      .addCase(fetchFavoriteList.fulfilled, (state, action) => {
        state.favoriteListStatus = fetchRequest.SUCCESS;
        state.favoriteList = action.payload;
      })
      .addCase(fetchFavoriteList.rejected, (state) => {
        state.favoriteListStatus = fetchRequest.ERROR;
        state.favoriteList = [
          {
            titleList: "All Favorites",
            data: [],
          },
        ];
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
        state.productAdded.checked = false;
        state.favoriteList = [
          {
            titleList: "All Favorites",
            data: [],
          },
        ];
      })
      .addCase(productAddToList.pending, (state) => {
        state.favoriteListStatus = fetchRequest.LOADING;
        state.productAdded.checked = false;
      })
      .addCase(productAddToList.fulfilled, (state, action) => {
        state.favoriteListStatus = fetchRequest.SUCCESS;
        state.productAdded.text = action.payload;
        state.productAdded.checked = true;
      })
      .addCase(productAddToList.rejected, (state) => {
        state.favoriteListStatus = fetchRequest.ERROR;
        state.productAdded.text = "error";
        state.productAdded.checked = true;
      });
  },
});
export const { setProductAdded } = favoriteSlice.actions;
export default favoriteSlice.reducer;
