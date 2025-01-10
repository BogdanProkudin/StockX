import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axiosConfig/axios";
import { fetchRequest } from "../../@types/status";

export type ShipForm = {
  firstName: string;
  lastName: string;
  country: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  postalCode: number;
  phoneNumber: number;
};
interface ICartSlice {
  price: number;
  shipForm: ShipForm[];

  isPurchased: boolean;
  purchasedProducts: any[];
  purchasedStatus: fetchRequest;
}

const initialState: ICartSlice = {
  price: 0,
  shipForm: [
    {
      firstName: "",
      lastName: "",
      country: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      postalCode: 0,
      phoneNumber: 0,
    },
  ],
  isPurchased: false,
  purchasedProducts: [],
  purchasedStatus: fetchRequest.INITIAL,
};

export const getPurchasedProducts = createAsyncThunk(
  "cart/getPurchasedProducts",
  async () => {
    const { data } = await axios.post("/getPurchasedProducts", {
      token: localStorage.getItem("token"),
    });
    console.log("items from data:", data);

    return data;
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    setFormShip: (state, action: PayloadAction<ShipForm[]>) => {
      state.shipForm = action.payload;
    },
    setIsPurchased: (state, action: PayloadAction<boolean>) => {
      state.isPurchased = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getPurchasedProducts.pending, (state) => {
        state.purchasedStatus = fetchRequest.LOADING;
        state.purchasedProducts = [];
      })
      .addCase(getPurchasedProducts.fulfilled, (state, action) => {
        state.purchasedStatus = fetchRequest.SUCCESS;
        state.purchasedProducts = action.payload;
      })
      .addCase(getPurchasedProducts.rejected, (state) => {
        state.purchasedStatus = fetchRequest.ERROR;
        state.purchasedProducts = [];
      });
  },
});

export const { setCartPrice, setFormShip, setIsPurchased } = cartSlice.actions;
export default cartSlice.reducer;
