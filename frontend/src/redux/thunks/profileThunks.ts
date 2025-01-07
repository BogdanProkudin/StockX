import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../@types/userAuth";
import axios from "../../axiosConfig/axios";
import { EditProfileSuccessResponse } from "../slices/profileSlice";

// Редактирование данных юзера
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
