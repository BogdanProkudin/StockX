import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../@types/userAuth";

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
});

export const { setUserData } = profileSlice.actions;
export default profileSlice.reducer;
