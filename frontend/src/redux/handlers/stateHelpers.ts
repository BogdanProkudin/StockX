import { IUserAuthSlice } from "../slices/authSlice";
import { fetchRequest } from "../../@types/status";

// Установка состояния загрузки
export const setLoadingState = (state: IUserAuthSlice) => {
  state.loginStatus = fetchRequest.LOADING;
};

// Установка состояния ошибки
export const setErrorState = (state: IUserAuthSlice, message: string) => {
  state.loginStatus = fetchRequest.ERROR;
  state.registrationBackendError = message || "An unknown error occurred";
};

// Установка успешного состояния
export const setSuccessState = (state: IUserAuthSlice) => {
  state.loginStatus = fetchRequest.SUCCESS;
};
