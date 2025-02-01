import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig/axios";
import { IUser } from "../../@types/userAuth";
import { ShippingFormType } from "../../@types/ProfileFormTyoes";
import { ShipForm } from "../slices/cartSlice";
import {
  AddBillingAddressResponse,
  AddShippingAddressResponse,
  EditBillingAddressResponse,
  EditShippingAddressResponse,
} from "../slices/profileSlice";

export interface GetShippingAddressError {
  message: string; // Ошибочное сообщение.
}
export const GetShippingAddress = createAsyncThunk<
  { shippingAddresses: ShipForm[] },
  { token: string },
  { rejectValue: GetShippingAddressError }
>("cart/GetShippingAddress", async ({ token }, thunkAPI) => {
  try {
    console.log("request");

    const response = await axios.get("/getShippingAddresses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const AddBillingAddress = createAsyncThunk<
  AddBillingAddressResponse,
  { token: string; userData: ShipForm },
  { rejectValue: AddBillingAddressResponse }
>("cart/AddBillingAddress", async ({ token, userData }, thunkAPI) => {
  try {
    const response = await axios.post(
      "/addBillingAddress",
      { billingAddress: userData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const EditBillingAddress = createAsyncThunk<
  EditBillingAddressResponse,
  { token: string; userData: ShipForm },
  { rejectValue: EditBillingAddressResponse }
>("cart/EditBillingAddress", async ({ token, userData }, thunkAPI) => {
  try {
    const response = await axios.post(
      "/editBillingAddress",
      { billingAddress: userData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const GetBillingAddress = createAsyncThunk<
  { billingAddresses: ShipForm[] },
  { token: string },
  { rejectValue: GetShippingAddressError }
>("cart/GetBillingAddress", async ({ token }, thunkAPI) => {
  try {
    const response = await axios.get("/getBillingAddresses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
