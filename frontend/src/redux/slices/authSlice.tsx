import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/userAuth";
import axios from "axios";
interface IUserAuthSlice {
  userData: IUser;
  validationErrors: any;
  resetPass: boolean;
}
const initialState: IUserAuthSlice = {
  userData: { email: "", password: "", firstName: "", secondName: "" },
  validationErrors: [],
  resetPass: false,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setValidationErrors: (state, action: PayloadAction<any>) => {
      const { errors } = action.payload;
      const nameList = ["firstName", "secondName", "email", "password"];
      if (errors) {
        nameList.forEach((name) => {
          if (errors[name]) {
            delete errors[name].ref;
            state.validationErrors.push(errors[name].message); // юзаю иммер что бы мутировать состояние
          } else {
            return;
          }
        });
      }
    },

    setClearValidationErrors: (state) => {
      state.validationErrors = [];
    },
    setResetPass(state, action: PayloadAction<boolean>) {
      state.resetPass = action.payload;
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
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (params: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("/login", params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const { setValidationErrors, setClearValidationErrors, setResetPass } =
  userAuthSlice.actions;
export default userAuthSlice.reducer;
