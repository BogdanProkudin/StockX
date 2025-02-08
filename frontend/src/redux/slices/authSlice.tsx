import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IUser, IUserAuthSlice } from "../../@types/userAuth";
import { fetchRequest } from "../../@types/status";

import {
  registerUser,
  loginUser,
  requestResetPassword,
  isResetPasswordTokenValid,
  resetPassword,
} from "../thunks/authThunks";

const initialState: IUserAuthSlice = {
  userData: {
    email: "",
    password: "",
    firstName: "",
    secondName: "",
    userName: "",
    shoeSize: "",
  },
  validationErrors: [],
  registrationBackendError: "",
  registrationStatus: fetchRequest.INITIAL,
  loginBackendError: "",
  resetPass: false,
  loginStatus: fetchRequest.INITIAL,
  resetPasswordStatus: fetchRequest.INITIAL,
  stateAuthSwitcher: "Sign Up",
  tokenStatus: fetchRequest.INITIAL,
  requestResetStatus: fetchRequest.INITIAL,
  requestResetPasswordError: "",
  resetPasswordError: [],
  resetPasswordBackendError: "",
};

// Создание слайса
const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setValidationErrors: (state, action: PayloadAction<any>) => {
      const { errors } = action.payload;
      const nameList = ["firstName", "secondName", "email", "password"];
      nameList.forEach((name) => {
        if (errors[name]) {
          delete errors[name].ref;
          state.validationErrors.push(errors[name].message);
        }
      });
    },
    setClearValidationErrors: (state) => {
      state.validationErrors = [];
    },
    setClearBackendErrors: (state) => {
      state.registrationBackendError = "";
      state.loginBackendError = "";
    },
    setResetPass(state, action: PayloadAction<boolean>) {
      state.resetPass = action.payload;
    },
    setLogout(state) {
      state.userData = {
        email: "",
        password: "",
        firstName: "",
        secondName: "",
        userName: "",
        shoeSize: "",
      };
    },
    setAuthSwitcher(state, action: PayloadAction<string>) {
      state.stateAuthSwitcher = action.payload;
    },
    setRequestResetPasswordError(state, action: PayloadAction<string>) {
      state.requestResetPasswordError = action.payload;
    },
    setResetPassowrdError(state, action: PayloadAction<any>) {
      const { errors } = action.payload;
      const nameList = ["password", "confirmPassword"];
      nameList.forEach((name) => {
        if (errors[name]) {
          delete errors[name].ref;
          state.resetPasswordError.push(errors[name].message);
        }
      });
    },
    setClearResetPasswordError(state) {
      state.resetPasswordError = [];
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IUserAuthSlice>) => {
    builder
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.registrationBackendError = "";
        state.registrationStatus = fetchRequest.LOADING;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.userData = action.payload;
          state.registrationStatus = fetchRequest.SUCCESS;
        },
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.registrationBackendError =
          action.payload?.message || "An unknown error occurred";
        state.registrationStatus = fetchRequest.ERROR;
      })

      // Логин
      .addCase(loginUser.pending, (state) => {
        state.loginBackendError = "";
        state.loginStatus = fetchRequest.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.userData = action.payload;
        state.validationErrors = [];
        state.loginStatus = fetchRequest.SUCCESS;
        state.loginBackendError = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = fetchRequest.ERROR;
        state.loginBackendError = action.payload?.message || "";
      })

      // Восстановление пароля
      .addCase(requestResetPassword.pending, (state) => {
        console.log("loading");

        state.requestResetPasswordError = undefined;
        state.requestResetStatus = fetchRequest.LOADING;
      })
      .addCase(
        requestResetPassword.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {
          state.requestResetPasswordError = undefined;
          state.requestResetStatus = fetchRequest.SUCCESS;
        },
      )
      .addCase(requestResetPassword.rejected, (state, action) => {
        state.requestResetStatus = fetchRequest.ERROR;
        state.requestResetPasswordError = action.payload?.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordBackendError = "";
        state.resetPasswordStatus = fetchRequest.LOADING;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordStatus = fetchRequest.SUCCESS;
        state.resetPasswordBackendError = "";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordStatus = fetchRequest.ERROR;
        state.resetPasswordBackendError =
          action.payload?.message || "An unknown error occurred";
      })

      .addCase(isResetPasswordTokenValid.pending, (state) => {
        state.tokenStatus = fetchRequest.LOADING;
      })
      .addCase(isResetPasswordTokenValid.fulfilled, (state) => {
        state.tokenStatus = fetchRequest.SUCCESS;
      })
      .addCase(isResetPasswordTokenValid.rejected, (state, action) => {
        state.tokenStatus = fetchRequest.ERROR;
      });
  },
});

export const {
  setValidationErrors,
  setClearValidationErrors,
  setResetPass,
  setLogout,
  setAuthSwitcher,
  setClearBackendErrors,
  setRequestResetPasswordError,
  setResetPassowrdError,
  setClearResetPasswordError,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
