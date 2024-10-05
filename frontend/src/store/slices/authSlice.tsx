import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/userAuth";
import axios from "axios";
interface IUserAuthSlice {
  userData: IUser;
  validationErrors: string;
}
const initialState: IUserAuthSlice = {
  userData: { email: "", password: "", firstName: "", secondName: "" },
  validationErrors: "",
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setValidationErrors: (state, action: PayloadAction<string>) => {
      state.validationErrors = action.payload;
    },
  },
});
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: IUser, thunkAPI) => {
    try {
      const response = await axios.post("/signup", userData);
      console.log("Response from registation", response);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const { setValidationErrors } = userAuthSlice.actions;
export default userAuthSlice.reducer;
