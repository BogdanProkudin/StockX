import {
  ActionReducerMapBuilder,
  CaseReducer,
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { IUser } from "../../types/userAuth";
import axios from "axios";

// Интерфейс для состояния
interface IUserAuthSlice {
  userData: IUser;
  validationErrors: any[];
  registrationBackendErrors: string;
  resetPass: boolean;
}

const initialState: IUserAuthSlice = {
  userData: { email: "", password: "", firstName: "", secondName: "" },
  validationErrors: [],
  registrationBackendErrors: "",
  resetPass: false,
};

// Асинхронные экшены

export const registerUser = createAsyncThunk<
  IUser, // Возвращаемый тип в случае успеха
  IUser, // Тип аргументов
  { rejectValue: { message: string } } // Тип ошибки для rejectWithValue
>("auth/registerUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:3003/signup", userData);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.response.data });
  }
});

export const loginUser = createAsyncThunk<
  IUser, // Возвращаемый тип в случае успеха
  { email: string; password: string }, // Тип аргументов
  { rejectValue: { message: string } } // Тип ошибки для rejectWithValue
>("auth/loginUser", async (params, thunkAPI) => {
  try {
    const response = await axios.post("/login", params);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.response.data });
  }
});
export const resetUserPassword = createAsyncThunk<
  IUser, // Возвращаемый тип в случае успеха
  { email: string }, // Тип аргументов
  { rejectValue: { message: string } } // Тип ошибки для rejectWithValue
>("auth/resetUserPassword", async (params, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:3003/resetPassword",
      params
    );
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
            state.validationErrors.push(errors[name].message); // юзаю иммер для мутирования состояния
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
  },
  extraReducers: (builder: ActionReducerMapBuilder<IUserAuthSlice>) => {
    builder
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
      );
  },
});

// Экспортируем экшены и редьюсер
export const { setValidationErrors, setClearValidationErrors, setResetPass } =
  userAuthSlice.actions;
export default userAuthSlice.reducer;
