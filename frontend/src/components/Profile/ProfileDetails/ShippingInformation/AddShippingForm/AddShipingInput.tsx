import { useState } from "react";
import { UseFormRegister, FieldError, UseFormWatch } from "react-hook-form";
import { Inputs } from "../../../../AuthUser/@types/RegisterTypes";

interface EditProfileInputProps {
  register: UseFormRegister<any>;
  errors: FieldError | any;
  inputName: string;
}
const AddShipingInput = ({
  inputName,
  register,
  errors,
}: EditProfileInputProps) => {
  const placeholders =
    inputName === "firstName"
      ? "First Name"
      : inputName === "lastName"
        ? "Last Name"
        : inputName === "Country"
          ? "Country"
          : inputName === "address"
            ? "Adress 1"
            : inputName === "address2"
              ? "Adress 2"
              : inputName === "city"
                ? "City"
                : inputName === "state"
                  ? "State/Region"
                  : inputName === "postalCode"
                    ? "Postal Code"
                    : inputName === "phoneNumber"
                      ? "Phone Number"
                      : "";

  return (
    <div>
      <h1>{placeholders}</h1>
      <input
        {...register(inputName)}
        className="border-brand-primary bg-background-accent-1 text-text-prim relative h-12 w-full min-w-0 appearance-none rounded-md border border-[#006340] bg-[#F4F3F1] px-4 text-lg outline-2 outline-offset-2 outline-transparent transition duration-200"
      />
      {errors[inputName] && (
        <p className="text-red-500">{errors[inputName].message}</p>
      )}
    </div>
  );
};

export default AddShipingInput;
