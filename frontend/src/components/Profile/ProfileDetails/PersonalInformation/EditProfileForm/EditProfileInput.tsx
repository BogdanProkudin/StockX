import { useState } from "react";

interface EditProfileInputProps {
  inputName: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const EditProfileInput = ({
  inputName,
  value,
  setValue,
}: EditProfileInputProps) => {
  return (
    <div>
      <h1>{inputName}</h1>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-brand-primary bg-background-accent-1 text-text-prim relative h-12 w-full min-w-0 appearance-none rounded-md border border-[#006340] bg-[#F4F3F1] px-4 text-lg outline-2 outline-offset-2 outline-transparent transition duration-200"
      />
    </div>
  );
};

export default EditProfileInput;
