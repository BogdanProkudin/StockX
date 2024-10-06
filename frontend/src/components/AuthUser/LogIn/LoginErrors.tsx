import React from "react";
import { useAppSelector } from "../../../redux/hook";

const LoginErrors: React.FC = () => {
  const ValidationEroros = useAppSelector(
    (state) => state.userAuth.validationErrors
  );
  return <div>LoginErrors,{ValidationEroros[0]}</div>;
};

export default LoginErrors;
