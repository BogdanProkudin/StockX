import { createSlice } from "@reduxjs/toolkit";
import { userCardProps } from "../../@types/userCardTypes";

interface IitemsProps {
  title: string;
  data: userCardProps[];
  description: string;
}
interface IHomeItems {
  addidasItems: IitemsProps;
  nikeItems: IitemsProps;
  balenciagaItems: IitemsProps;
  accessories: IitemsProps;
  supremeItems: IitemsProps;
}

const initialState: IHomeItems = {
  addidasItems: { title: "", data: [], description: "" },
  nikeItems: { title: "", data: [], description: "" },
  balenciagaItems: { title: "", data: [], description: "" },
  accessories: { title: "", data: [], description: "" },
  supremeItems: { title: "", data: [], description: "" },
};
const homeItems = createSlice({
  name: "homeItems",
  initialState,
  reducers: {
    setAddidasItems: (state, action) => {
      state.addidasItems = action.payload;
    },
    setNikeItems: (state, action) => {
      state.nikeItems = action.payload;
    },
    setBalenciagaItems: (state, action) => {
      state.balenciagaItems = action.payload;
    },
    setAccessories: (state, action) => {
      state.accessories = action.payload;
    },
    setSupremeItems: (state, action) => {
      state.supremeItems = action.payload;
    },
  },
});

export const {
  setAddidasItems,
  setNikeItems,
  setBalenciagaItems,
  setAccessories,
  setSupremeItems,
} = homeItems.actions;
export default homeItems.reducer;
