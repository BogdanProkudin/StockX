import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axiosConfig/axios";
import { fetchRequest } from "../../@types/status";

import { ShippingFormType } from "../../@types/ProfileFormTyoes";
import {
  AddBillingMethod,
  EditBillingAddress,
  GetBillingAddress,
  GetShippingAddress,
} from "../thunks/cartThunks";
import { BillingMethodFormData } from "../../components/Cart/PaymentMethod";

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
  selectedShippingAddress: ShipForm;
  selectedBillingAddress: ShipForm;
  selectedBillingMethod: BillingMethodFormData;
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
  selectedShippingAddress: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: 0,
    phoneNumber: 0,
  },
  selectedBillingAddress: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: 0,
    phoneNumber: 0,
  },
  selectedBillingMethod: {
    holderName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    cardType: "",
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
    setUserShippingAddress: (state, action) => {
      state.userShippingAddress = action.payload;
    },
    setSelectedShippingAddress: (state, action) => {
      state.selectedShippingAddress = action.payload;
    },
    setSelectedBillingAddress: (state, action) => {
      state.selectedBillingAddress = action.payload;
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
      })
      .addCase(GetBillingAddress.pending, (state) => {})
      .addCase(GetBillingAddress.fulfilled, (state, action) => {
        state.selectedBillingAddress = action.payload.billingAddresses[0];
        state.selectedBillingMethod = action.payload.billingMethod;
      })
      .addCase(GetBillingAddress.rejected, (state) => {
        state.selectedBillingAddress = {
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
      })
      .addCase(EditBillingAddress.pending, (state) => {})
      .addCase(EditBillingAddress.fulfilled, (state, action) => {
        state.selectedBillingAddress = action.payload.billingAddresses[0];
      })
      .addCase(EditBillingAddress.rejected, (state) => {
        state.selectedBillingAddress = {
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
      })
      .addCase(AddBillingMethod.pending, (state) => {})

      .addCase(AddBillingMethod.fulfilled, (state, action) => {
        state.selectedBillingMethod = action.payload.billingMethod;
      })
      .addCase(AddBillingMethod.rejected, (state) => {
        state.selectedBillingMethod = {
          holderName: "",
          cardNumber: "",
          expDate: "",
          cvv: "",
          cardType: "",
        };
      });
  },
});

export const {
  setCartPrice,
  setFormShip,
  setUserShippingAddress,
  setIsPurchased,

  setSelectedBillingAddress,
  setBidVariant,
  setSelectedShippingAddress,
} = cartSlice.actions;
export default cartSlice.reducer;
