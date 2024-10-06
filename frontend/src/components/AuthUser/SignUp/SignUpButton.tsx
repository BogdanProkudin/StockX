import { useAppDispatch } from "../../../redux/hook";
import { setClearValidationErrors } from "../../../redux/slices/authSlice";

const SignUpButton = () => {
  const dispatch = useAppDispatch();
  const handleSignUpButtonCLick = () => {
    console.log("SIGN UP BUTTN CLICKED");

    dispatch(setClearValidationErrors());
  };
  return (
    <button onClick={() => handleSignUpButtonCLick()} type="submit">
      Sign Up
    </button>
  );
};

export default SignUpButton;
