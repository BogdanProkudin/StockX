import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/userAuth";
import axios from "axios";

const initialState: IUser = {
  userData: { email: "", password: "", firstName: "", secondName: "" },
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {},
});
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: IUser, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3003/signup",
        userData
      );
      console.log("Response from registation", response);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const {} = userAuthSlice.actions;
export default userAuthSlice.reducer;
