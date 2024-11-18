import { createSlice } from "@reduxjs/toolkit";
import { userCardProps } from "../../@types/userCardTypes";

interface IitemsProps {
  title: string;
  data: userCardProps[];
  description: string;
}
interface IimageProps {
  img: string;
  path: string;
  alt: string;
}
interface IHomeItems {
  addidasItems: IitemsProps;
  nikeItems: IitemsProps;
  balenciagaItems: IitemsProps;
  accessories: IitemsProps;
  supremeItems: IitemsProps;
  timberlandItems: IitemsProps;
  rickOwensItems: IitemsProps;
  controllersItems: IitemsProps;
  popularImageItems: { title: string; data: IimageProps[] };
  holidayImageItems: { title: string; data: IimageProps[] };
  seasonalImageItems: { title: string; data: IimageProps[] };
  browseImageItems: { title: string; data: IimageProps[] };
  instagramSectionItems: { data: userCardProps[]; image: "" }[];
}

const initialState: IHomeItems = {
  addidasItems: { title: "", data: [], description: "" },
  nikeItems: { title: "", data: [], description: "" },
  balenciagaItems: { title: "", data: [], description: "" },
  accessories: { title: "", data: [], description: "" },
  supremeItems: { title: "", data: [], description: "" },
  timberlandItems: { title: "", data: [], description: "" },
  rickOwensItems: { title: "", data: [], description: "" },
  controllersItems: { title: "", data: [], description: "" },
  popularImageItems: { title: "", data: [] },
  holidayImageItems: { title: "", data: [] },
  seasonalImageItems: { title: "", data: [] },
  browseImageItems: { title: "", data: [] },
  instagramSectionItems: [{ data: [], image: "" }],
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
    setInstagramItems: (state, action) => {
      state.instagramSectionItems = action.payload;
    },
    setTimberlandItems: (state, action) => {
      state.timberlandItems = action.payload;
    },
    setRickOwensItems: (state, action) => {
      state.rickOwensItems = action.payload;
    },
    setControllersItems: (state, action) => {
      state.controllersItems = action.payload;
    },
    setPopularImage: (state, action) => {
      state.popularImageItems = action.payload;
    },
    setHolidayImage: (state, action) => {
      state.holidayImageItems = action.payload;
    },
    setSeasonalImage: (state, action) => {
      state.seasonalImageItems = action.payload;
    },
    setBrowseImage: (state, action) => {
      state.browseImageItems = action.payload;
    },
  },
});

export const {
  setAddidasItems,
  setNikeItems,
  setBalenciagaItems,
  setAccessories,
  setSupremeItems,
  setInstagramItems,
  setTimberlandItems,
  setRickOwensItems,
  setControllersItems,
  setPopularImage,
  setHolidayImage,
  setSeasonalImage,
  setBrowseImage,
} = homeItems.actions;
export default homeItems.reducer;
