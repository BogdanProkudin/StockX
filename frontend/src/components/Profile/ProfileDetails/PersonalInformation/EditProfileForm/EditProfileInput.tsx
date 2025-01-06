import { useState } from "react";
import { UseFormRegister, FieldError, UseFormWatch } from "react-hook-form";
import { Inputs } from "../../../../AuthUser/@types/RegisterTypes";

interface EditProfileInputProps {
  register: UseFormRegister<any>;
  errors: FieldError | any;
  inputName: string;
}
const EditProfileInput = ({
  inputName,
  register,
  errors,
}: EditProfileInputProps) => {
  // const placeholders =
  // name === "firstName"
  //   ? "First Name"
  //   : name === "secondName"
  //     ? "Last Name"
  //     : name === "email"
  //       ? "Email Address"
  //       : "Password";

  return (
    <div>
      <h1>{inputName}</h1>
      <input
        {...register(inputName)}
        className="border-brand-primary bg-background-accent-1 text-text-prim relative h-12 w-full min-w-0 appearance-none rounded-md border border-[#006340] bg-[#F4F3F1] px-4 text-lg outline-2 outline-offset-2 outline-transparent transition duration-200"
      />
      {errors[inputName] && <p>{errors[inputName].message}</p>}
    </div>
  );
};

export default EditProfileInput;
