import { UseFormRegister, UseFormWatch } from "react-hook-form";
export type LoginInputs = {
  email: string;
  password: string;
};
export type LoginInputPros = {
  name: keyof LoginInputs;
  register: UseFormRegister<any>;
  watch: UseFormWatch<LoginInputs>;
};
