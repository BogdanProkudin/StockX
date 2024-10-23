import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IUser } from "../../@types/userAuth";

import {
  setLoadingState,
  setErrorState,
  setSuccessState,
} from "../handlers/stateHelpers";
import {
  registerUser,
  loginUser,
  requestResetPassword,
  isResetPasswordTokenValid,
} from "../thunks/authThunks";
export enum fetchRequest {
  INITIAL = "",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
// Интерфейс для состояния
export interface IUserAuthSlice {
  userData: IUser;
  validationErrors: any[];
  registrationStatus: string;
  registrationBackendErrors: string;
  loginBackendErrors: string;
  resetPass: boolean;
  loginStatus: fetchRequest;
  resetPasswordStatus: fetchRequest;
  stateAuthSwitcher: string;
  requestResetPasswordError: string | undefined;
  resetPasswordError: string[];
}

const initialState: IUserAuthSlice = {
  userData: { email: "", password: "", firstName: "", secondName: "" },
  validationErrors: [],
  registrationBackendErrors: "",
  registrationStatus: fetchRequest.INITIAL,
  loginBackendErrors: "",
  resetPass: false,
  loginStatus: fetchRequest.INITIAL,
  resetPasswordStatus: fetchRequest.INITIAL,
  stateAuthSwitcher: "Sign Up",
  requestResetPasswordError: "",
  resetPasswordError: [],
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
      state.registrationBackendErrors = "";
      state.loginBackendErrors = "";
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
        console.log("PENDING");

        state.registrationBackendErrors = "";
        state.registrationStatus = fetchRequest.LOADING;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.userData = action.payload;

          state.registrationStatus = fetchRequest.SUCCESS;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.registrationBackendErrors =
          action.payload?.message || "An unknown error occurred";

        state.registrationStatus = fetchRequest.ERROR;
      })

      // Логин
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = fetchRequest.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.userData = action.payload;
        state.validationErrors = [];
        state.loginStatus = fetchRequest.SUCCESS;
        state.loginBackendErrors = "";
        setSuccessState(state);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = fetchRequest.ERROR;
        state.loginBackendErrors = action.payload?.message || "";
      })

      // Восстановление пароля
      .addCase(requestResetPassword.pending, (state) => {
        console.log("loading");

        state.requestResetPasswordError = undefined;
        state.resetPasswordStatus = fetchRequest.LOADING;
      })
      .addCase(
        requestResetPassword.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {
          state.requestResetPasswordError = undefined;
          state.resetPasswordStatus = fetchRequest.SUCCESS;
        }
      )
      .addCase(requestResetPassword.rejected, (state, action) => {
        state.resetPasswordStatus = fetchRequest.ERROR;
        state.requestResetPasswordError = action.payload?.message;
      })

      // Проверка токена для сброса пароля
      .addCase(isResetPasswordTokenValid.pending, setLoadingState)
      .addCase(isResetPasswordTokenValid.fulfilled, setSuccessState)
      .addCase(isResetPasswordTokenValid.rejected, (state, action) => {
        setErrorState(
          state,
          action.payload?.message || "Token validation failed"
        );
      });
  },
});

// Экспортируем экшены и редьюсер
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
