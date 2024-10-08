export interface IUser {
  token?: string; // это то что приходит с бекенда как ответ если success
  message?: string; // это то что приходит с бекенда как ответ если success
  email: string;
  password: string;
  firstName: string;
  secondName: string;

  //нужно так же добавлять типизацию на favouriteShoes и тд , но это позже
}
