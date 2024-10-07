import { IUser } from "../types/userAuth";

export const LocalUserData = () => {
  const user = localStorage.getItem("token");
  const data: IUser = user
    ? JSON.parse(user)
    : { email: "", password: "", firstName: "", secondName: "" };
  return data;
};
