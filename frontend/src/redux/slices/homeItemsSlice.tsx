import { createSlice } from "@reduxjs/toolkit";
import { userCardProps } from "../../@types/userCardTypes";

interface IitemsProps {
  title: string;
  data: userCardProps[];
  description: string;
}
interface IHomeItems {
  trendingItems: IitemsProps;
  featuredItems: IitemsProps;
  featuredAccessories: IitemsProps;
}

const initialState: IHomeItems = {
  trendingItems: { title: "", data: [], description: "" },
  featuredItems: { title: "", data: [], description: "" },
  featuredAccessories: { title: "", data: [], description: "" },
};
const homeItems = createSlice({
  name: "homeItems",
  initialState,
  reducers: {
    setTrendingItems: (state, action) => {
      state.trendingItems = action.payload;
    },
    setFeaturedItems: (state, action) => {
      state.featuredItems = action.payload;
    },
    setFeaturedAccessories: (state, action) => {
      state.featuredAccessories = action.payload;
    },
  },
});

export const { setTrendingItems, setFeaturedItems, setFeaturedAccessories } =
  homeItems.actions;
export default homeItems.reducer;
