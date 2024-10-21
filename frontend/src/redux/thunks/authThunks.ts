import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../@types/userAuth";
import axios from "../../axiosConfig/axios";

// Регистрация пользователя
export const registerUser = createAsyncThunk<
  IUser,
  IUser,
  { rejectValue: { message: string } }
>("auth/registerUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post("/signup", userData);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Логин пользователя
export const loginUser = createAsyncThunk<
  IUser,
  { email: string; password: string },
  { rejectValue: { message: string } }
>("auth/login", async (params, thunkAPI) => {
  try {
    const response = await axios.post("/login", params);
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Восстановление пароля
export const resetUserPassword = createAsyncThunk<
  string,
  { email: string },
  { rejectValue: { message: string } }
>("auth/resetUserPassword", async (params, thunkAPI) => {
  try {
    const response = await axios.post("/resetPassword", params);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Проверка токена для сброса пароля
export const isResetPasswordTokenValid = createAsyncThunk<
  string,
  { resetPasswordToken: string },
  { rejectValue: { message: string } }
>("auth/isResetPasswordTokenValid", async (params, thunkAPI) => {
  try {
    const response = await axios.post("/tokenValidation", params);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
