import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { setClearValidationErrors } from "../../../redux/slices/authSlice";

const SignUpButton = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.userAuth.status);
  const [isClicked, setIsClicked] = React.useState(false);
  const handleSignUpButtonCLick = () => {
    console.log("SIGN UP BUTTN CLICKED");
    setIsClicked(!isClicked);
    dispatch(setClearValidationErrors());
  };
  return (
    <button onClick={() => handleSignUpButtonCLick()} type="submit">
      {status === "loading" && isClicked ? "loading" : "Sign up"}
    </button>
    // тут надо найти иконку анимированую и подставить вместо loading и там есть не большой баг (уже пофиксил но надо потестить я потестил все норм ну чуство странное)
  );
};

export default SignUpButton;
