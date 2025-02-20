export interface IUser {
  token?: string;
  message?: string;
  email: string;
  password?: string;
  firstName: string;
  secondName: string;
  shoeSize: string;
  userName: string;
  id?: string;
  country?: string;
  //нужно так же добавлять типизацию на favouriteShoes и тд , но это позже
}
export interface IUserAuthSlice {
  userData: IUser;
  validationErrors: any[];
  registrationStatus: string;
  registrationBackendError: string;
  loginBackendError: string;
  resetPass: boolean;
  loginStatus: fetchRequest;
  resetPasswordStatus: fetchRequest;
  stateAuthSwitcher: string;
  requestResetPasswordError: string | undefined;
  tokenStatus: fetchRequest;
  requestResetStatus: fetchRequest;
  resetPasswordError: string[];
  resetPasswordBackendError: string;
}
