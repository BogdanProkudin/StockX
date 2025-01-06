import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IUser } from "../../@types/userAuth";
import { EditUserData } from "../thunks/profileThunks";
export interface EditProfileSuccessResponse {
  message: string;
  userData: IUser;
}
export type ProfileType = {};

interface IProfileSlice {
  userData: IUser;
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
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser>) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IProfileSlice>) => {
    builder
      .addCase(EditUserData.pending, (state) => {})
      .addCase(
        EditUserData.fulfilled,
        (state, action: PayloadAction<EditProfileSuccessResponse>) => {
          console.log("ACTION PAYLOAD", action.payload);

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
  },
});

export const { setUserData } = profileSlice.actions;
export default profileSlice.reducer;
