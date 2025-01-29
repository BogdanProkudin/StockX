import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axiosConfig/axios";
import { fetchRequest } from "../../@types/status";
import { AddShippingAddressResponse } from "./profileSlice";
import { ShippingFormType } from "../../@types/ProfileFormTyoes";
import { GetShippingAddress } from "../thunks/cartThunks";

export type ShipForm = {
  firstName: string;
  lastName: string;
  country?: string;
  id?: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: number;
  phoneNumber: number;
};
export type purchasedProducts = {
  title: string;
  size: string;
  price: number;
  img: string;
  brand: string;
  addedAt: number;
  status: string;
  sku: string;
};
interface ICartSlice {
  price: number;
  shipForm: ShipForm[];
  bidVariant: string;
  isPurchased: boolean;
  purchasedProducts: purchasedProducts[];
  purchasedStatus: fetchRequest;
  bidsPurchasedProducts: purchasedProducts[];
  bidsPurchasedStatus: fetchRequest;
  userShippingAddress: ShipForm;
}

const initialState: ICartSlice = {
  price: 0,
  bidVariant: "",
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
  bidsPurchasedProducts: [],
  bidsPurchasedStatus: fetchRequest.INITIAL,
  userShippingAddress: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    state: "",
    address2: "",
    postalCode: 0,
    phoneNumber: 0,
  },
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
export const getBidsPurchasedProducts = createAsyncThunk(
  "cart/getBidsPurchasedProducts",
  async () => {
    const { data } = await axios.post("/getBidsPurchasedProducts", {
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
    setBidVariant: (state, action: PayloadAction<string>) => {
      state.bidVariant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getPurchasedProducts.pending, (state) => {
        state.purchasedStatus = fetchRequest.LOADING;
        state.purchasedProducts = [];
      })
      .addCase(
        getPurchasedProducts.fulfilled,
        (state, action: PayloadAction<purchasedProducts[]>) => {
          state.purchasedStatus = fetchRequest.SUCCESS;
          state.purchasedProducts = action.payload;
        },
      )
      .addCase(getPurchasedProducts.rejected, (state) => {
        state.purchasedStatus = fetchRequest.ERROR;
        state.purchasedProducts = [];
      })
      .addCase(getBidsPurchasedProducts.pending, (state) => {
        state.bidsPurchasedStatus = fetchRequest.LOADING;
        state.bidsPurchasedProducts = [];
      })
      .addCase(
        getBidsPurchasedProducts.fulfilled,
        (state, action: PayloadAction<purchasedProducts[]>) => {
          state.bidsPurchasedStatus = fetchRequest.SUCCESS;
          state.bidsPurchasedProducts = action.payload;
        },
      )
      .addCase(getBidsPurchasedProducts.rejected, (state) => {
        state.bidsPurchasedStatus = fetchRequest.ERROR;
        state.bidsPurchasedProducts = [];
      })
      .addCase(GetShippingAddress.pending, (state) => {})
      .addCase(GetShippingAddress.fulfilled, (state, action) => {
        console.log("ACTIB", action.payload);

        state.userShippingAddress = action.payload.shippingAddresses[0];
      })
      .addCase(GetShippingAddress.rejected, (state) => {
        state.userShippingAddress = {
          firstName: "",
          lastName: "",
          address: "",
          country: "",
          address2: "",
          city: "",
          state: "",
          postalCode: 0,
          phoneNumber: 0,
        };
      });
  },
});

export const { setCartPrice, setFormShip, setIsPurchased, setBidVariant } =
  cartSlice.actions;
export default cartSlice.reducer;
