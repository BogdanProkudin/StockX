import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig/axios";
import { IUser } from "../../@types/userAuth";
import { ShippingFormType } from "../../@types/ProfileFormTyoes";
import { ShipForm } from "../slices/cartSlice";

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
