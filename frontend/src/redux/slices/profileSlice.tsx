import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IUser } from "../../@types/userAuth";
import { AddShippingAddress, EditUserData } from "../thunks/profileThunks";
import { ShippingFormType } from "../../@types/ProfileFormTyoes";

export interface EditProfileSuccessResponse {
  message: string;
  userData: IUser;
}

export interface AddShippingAddressResponse {
  shippingAddresses: ShippingFormType[];
}

interface IProfileSlice {
  userData: IUser;
  shippingAddresses: ShippingFormType[];
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
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser>) => {
      state.userData = action.payload;
    },
    setShippingAddresses: (
      state,
      action: PayloadAction<ShippingFormType[]>,
    ) => {
      state.shippingAddresses = action.payload;
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
          console.log(
            "ACTION PAYLOAD AddShippingAddress",
            action.payload.shippingAddresses,
          );
          state.shippingAddresses = action.payload.shippingAddresses;
        },
      )
      .addCase(AddShippingAddress.rejected, (state) => {});
  },
});

export const { setUserData, setShippingAddresses } = profileSlice.actions;
export default profileSlice.reducer;
