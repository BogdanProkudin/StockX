import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { setClearValidationErrors } from "../../../redux/slices/authSlice";

const LogInButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.userAuth.loginStatus);
  const [isClicked, setIsClicked] = React.useState(false);
  const handleSignUpButtonCLick = () => {
    setIsClicked(!isClicked);
    dispatch(setClearValidationErrors());
  };
  return (
    <button onClick={() => handleSignUpButtonCLick()} type="submit">
      {status === "loading" && isClicked ? "loading" : "Log in"}
    </button>
  );
};

export default LogInButton;
