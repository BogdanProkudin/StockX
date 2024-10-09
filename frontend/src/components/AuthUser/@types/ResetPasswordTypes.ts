import { UseFormRegister, UseFormWatch } from "react-hook-form";

export interface ResetInputs {
  password: string;
  confirmPassword: string;
}
export interface IReserInputProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<ResetInputs>;
  name: keyof ResetInputs;
  placeholder: string;
}
