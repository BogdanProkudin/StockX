import {
  ActionReducerMapBuilder,
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { IUser } from "../../@types/userAuth";

import axios from "../../axiosConfig/axios"; // пофиксил axios так что можно теперь использовать
// Интерфейс для состояния статуса
enum fetchRequest {
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
  status: fetchRequest;
}

const initialState: IUserAuthSlice = {
  userData: { email: "", password: "", firstName: "", secondName: "" },
  validationErrors: [],
  registrationBackendErrors: "",
  resetPass: false,
  status: fetchRequest.LOADING,
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
            state.status = fetchRequest.ERROR;
            state.validationErrors.push(errors[name].message); // юзаю иммер для мутирования состояния
          }
        });
      }
    },

    setClearValidationErrors: (state) => {
      state.validationErrors = [];
      state.registrationBackendErrors = "";
      state.status = fetchRequest.LOADING;
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
  },
  extraReducers: (builder: ActionReducerMapBuilder<IUserAuthSlice>) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registrationBackendErrors = "";
        state.status = fetchRequest.LOADING;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.userData = action.payload;
          state.validationErrors = [];
          state.status = fetchRequest.SUCCESS;
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
          state.status = fetchRequest.ERROR;
          state.registrationBackendErrors =
            action.payload?.message || "Unknown registration error";
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.registrationBackendErrors = "";
        state.status = fetchRequest.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.userData = action.payload;
        state.validationErrors = [];
        state.status = fetchRequest.SUCCESS;
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
          state.status = fetchRequest.ERROR;
          state.registrationBackendErrors =
            action.payload?.message || "Unknown registration error";
        }
      )
      .addCase(authMe.pending, (state) => {
        state.registrationBackendErrors = "";
      })
      .addCase(authMe.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.userData = action.payload;
        state.validationErrors = [];
      })
      .addCase(authMe.rejected, (state) => {
        state.status = fetchRequest.ERROR;
      });
  },
});

// Экспортируем экшены и редьюсер
export const {
  setValidationErrors,
  setClearValidationErrors,
  setResetPass,
  setLogout,
} = userAuthSlice.actions;
export default userAuthSlice.reducer;
