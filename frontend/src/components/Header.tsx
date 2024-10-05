import React from "react";
import { useAppDispatch } from "../store/hook";
import { registerUser } from "../store/slices/authSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const handleSendRegistration = () => {
    console.log("clicked");
    // тестовые данные отправки на регистрацию
    const userData = {
      email: "prokudinbogdan@gmail.com",
      password: "Screaper2221",
      firstName: "Bogdan",
      secondName: "Prokudin",
    };

    dispatch(registerUser(userData));
  };
  return (
    <div>
      Header
      <button onClick={() => handleSendRegistration()}>clcik</button>
    </div>
  );
};

export default Header;
