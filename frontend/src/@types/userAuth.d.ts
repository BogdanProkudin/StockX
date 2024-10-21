export interface IUser {
  token?: string;
  message?: string;
  email: string;
  password: string;
  firstName: string;
  secondName: string;

  //нужно так же добавлять типизацию на favouriteShoes и тд , но это позже
}
