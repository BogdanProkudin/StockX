import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IUser } from "../../@types/userAuth";
import {
  AddShippingAddress,
  EditShippingAddress,
  EditUserData,
} from "../thunks/profileThunks";
import { ShippingFormType } from "../../@types/ProfileFormTyoes";
import { Interface } from "node:readline";
import { ShipForm } from "./cartSlice";

export interface EditProfileSuccessResponse {
  message: string;
  userData: IUser;
}

export interface AddShippingAddressResponse {
  shippingAddresses: ShipForm[];
}
export interface EditShippingAddressResponse
  extends AddShippingAddressResponse {}

interface IProfileSlice {
  userData: IUser;
  shippingAddresses: ShipForm[];
  selectedEditShippingAddress: ShipForm;
}

const initialState: IProfileSlice = {
  userData: {
    email: "",
    password: "",
    firstName: "",
    secondName: "",
    userName: "",
    shoeSize: "",
  },
  shippingAddresses: [],
  selectedEditShippingAddress: {
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    address2: "",
    city: "",
    state: "",
    postalCode: 0,
    phoneNumber: 0,
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser>) => {
      state.userData = action.payload;
    },
    setShippingAddresses: (state, action: PayloadAction<ShipForm[]>) => {
      state.shippingAddresses = action.payload;
    },
    setSelectedEditShippingAddress: (state, action) => {
      state.selectedEditShippingAddress = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IProfileSlice>) => {
    builder
      .addCase(EditUserData.pending, (state) => {})
      .addCase(
        EditUserData.fulfilled,
        (state, action: PayloadAction<EditProfileSuccessResponse>) => {
          console.log("ACTION PAYLOAD EditUserData", action.payload);
          state.userData = action.payload.userData;
        },
      )
      .addCase(EditUserData.rejected, (state) => {
        state.userData = {
          email: "",
          password: "",
          firstName: "",
          secondName: "",
          userName: "",
          shoeSize: "",
        };
      });

    builder
      .addCase(AddShippingAddress.pending, (state) => {})
      .addCase(
        AddShippingAddress.fulfilled,
        (state, action: PayloadAction<AddShippingAddressResponse>) => {
          state.shippingAddresses = action.payload.shippingAddresses;
        },
      )
      .addCase(AddShippingAddress.rejected, (state) => {});
    builder
      .addCase(EditShippingAddress.pending, (state) => {})
      .addCase(
        EditShippingAddress.fulfilled,
        (state, action: PayloadAction<EditShippingAddressResponse>) => {
          state.shippingAddresses = action.payload.shippingAddresses;
        },
      )
      .addCase(EditShippingAddress.rejected, (state) => {});
  },
});

export const {
  setUserData,
  setShippingAddresses,
  setSelectedEditShippingAddress,
} = profileSlice.actions;
export default profileSlice.reducer;
