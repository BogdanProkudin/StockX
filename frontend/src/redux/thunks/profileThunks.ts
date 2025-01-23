import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../@types/userAuth";
import axios from "../../axiosConfig/axios";
import {
  AddShippingAddressResponse,
  EditProfileSuccessResponse,
  EditShippingAddressResponse,
} from "../slices/profileSlice";

export const EditUserData = createAsyncThunk<
  EditProfileSuccessResponse,
  { token: string; userData: IUser },
  { rejectValue: { message: string } }
>("profile/EditUserData", async ({ token, userData }, thunkAPI) => {
  try {
    const response = await axios.post("/editUserData", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const AddShippingAddress = createAsyncThunk<
  AddShippingAddressResponse,
  { token: string; userData: IUser },
  { rejectValue: { message: string } }
>("profile/AddShippingAddress", async ({ token, userData }, thunkAPI) => {
  try {
    const response = await axios.post(
      "/addShippingAddress",
      { shippingAddress: userData },
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
export const EditShippingAddress = createAsyncThunk<
  EditShippingAddressResponse,
  { token: string; userData: IUser },
  { rejectValue: { message: string } }
>("profile/EditShippingAddress", async ({ token, userData }, thunkAPI) => {
  try {
    const response = await axios.post(
      "/editShippingAddress",
      { shippingAddress: userData },
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
