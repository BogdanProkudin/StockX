import {
  ActionReducerMapBuilder,
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { IUser } from "../../@types/userAuth";

import axios from "../../axiosConfig/axios";

// Интерфейс для состояния статуса
enum fetchRequest {
  INITIAL = "",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

// Интерфейс для состояния
interface IUserAuthSlice {
  userData: IUser;
  validationErrors: any[];
  registrationBackendErrors: string;
  resetPass: boolean;
  loginStatus: fetchRequest;
  resetPasswordStatus: fetchRequest;
  stateAuthSwitcher: string;
  requestResetPasswordError: string | undefined;
}

const initialState: IUserAuthSlice = {
  userData: { email: "", password: "", firstName: "", secondName: "" },
  validationErrors: [],
  registrationBackendErrors: "",
  resetPass: false,
  loginStatus: fetchRequest.INITIAL,
  resetPasswordStatus: fetchRequest.INITIAL,
  stateAuthSwitcher: "Sign Up",
  requestResetPasswordError: "",
};

// Асинхронные экшены

export const registerUser = createAsyncThunk<
  IUser, // Возвращаемый тип в случае успеха
  IUser, // Тип аргументов
  { rejectValue: { message: string } } // Тип ошибки для rejectWithValue
>("auth/registerUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post("/signup", userData);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.response.data });
  }
});

export const loginUser = createAsyncThunk<
  IUser, // Возвращаемый тип в случае успеха
  { email: string; password: string }, // Тип аргументов
  { rejectValue: { message: string } } // Тип ошибки для rejectWithValue
>("auth/login", async (params, thunkAPI) => {
  try {
    const response = await axios.post("/login", params);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.response.data });
  }
});

export const resetUserPassword = createAsyncThunk<
  string, // Возвращаемый тип в случае успеха
  { email: string }, // Тип аргументов
  { rejectValue: { message: string } } // Тип ошибки для rejectWithValue
>("auth/resetUserPassword", async (params, thunkAPI) => {
  try {
    const response = await axios.post("/resetPassword", params);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.response.data });
  }
});

export const authMe = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/authMe");
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.response.data });
  }
});
export const isResetPasswordTokenValid = createAsyncThunk<
  string, // Возвращаемый тип в случае успеха
  { resetPasswordToken: string }, // Тип аргументов
  { rejectValue: { message: string } } // Тип ошибки для rejectWithValue
>("auth/isResetPasswordTokenValid", async (params, thunkAPI) => {
  try {
    const response = await axios.post("/tokenValidation", params);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.response.data });
  }
});
// Slice

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
            state.validationErrors.push(errors[name].message); // используем иммер для мутирования состояния
          }
        });
      }
    },
    setClearValidationErrors: (state) => {
      state.validationErrors = [];
      state.registrationBackendErrors = "";
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
  },
  extraReducers: (builder: ActionReducerMapBuilder<IUserAuthSlice>) => {
    builder
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.registrationBackendErrors = "";
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.userData = action.payload;
          state.validationErrors = [];
        }
      )
      .addCase(
        registerUser.rejected,
        (
          state,
          action: PayloadAction<
            { message: string } | undefined, // Полезная нагрузка для rejected
            string, // Тип action
            { arg: IUser; requestId: string }, // Доп. данные из asyncThunk
            SerializedError // Сериализованная ошибка
          >
        ) => {
          state.registrationBackendErrors =
            action.payload?.message || "Unknown registration error";
        }
      )

      // Логин
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = fetchRequest.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.userData = action.payload;
        state.validationErrors = [];
        state.loginStatus = fetchRequest.SUCCESS;
      })
      .addCase(
        loginUser.rejected,
        (
          state,
          action: PayloadAction<
            { message: string } | undefined, // Полезная нагрузка для rejected
            string, // Тип action
            { arg: { email: string; password: string }; requestId: string }, // Доп. данные из asyncThunk
            SerializedError // Сериализованная ошибка
          >
        ) => {
          state.loginStatus = fetchRequest.ERROR;
          state.registrationBackendErrors =
            action.payload?.message || "Unknown login error";
        }
      )

      // Восстановление пароля
      .addCase(resetUserPassword.pending, (state) => {
        state.resetPasswordStatus = fetchRequest.LOADING;
      })
      .addCase(
        resetUserPassword.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {
          state.requestResetPasswordError = undefined;
          state.resetPasswordStatus = fetchRequest.SUCCESS;
        }
      )
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.resetPasswordStatus = fetchRequest.ERROR;
        state.requestResetPasswordError = action.payload?.message;
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
  setRequestResetPasswordError,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
