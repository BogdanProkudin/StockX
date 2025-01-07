import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook";
import EditProfileInput from "./EditProfileInput";
import EditProfileInputButton from "./EditProfileInputButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Inputs } from "../../../../AuthUser/@types/RegisterTypes";
import {
  emailValidationSchema,
  passwordValidationSchema,
  firstNameValidationSchema,
  secondNameValidationSchema,
} from "../../../../AuthUser/SignUp/SignUpValidation";
import { EditUserData } from "../../../../../redux/thunks/profileThunks";
import { useNavigate } from "react-router-dom";
import { ProfileFormType } from "../../../../AuthUser/@types/ProfileFormTyoes";
const validationSchema = Yup.object().shape({
  email: emailValidationSchema,

  firstName: firstNameValidationSchema,
  secondName: secondNameValidationSchema,
});
const EditProfleForm = () => {
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<ProfileFormType>({
    resolver: yupResolver(validationSchema),
  });
  const userData = useAppSelector((state) => state.profileSlice.userData);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (userData) {
      setIsLoading(false);
      setValue("firstName", userData.firstName);
      setValue("secondName", userData.secondName);
      setValue("email", userData.email);
    }
  }, [userData, setValue]);

  const onSubmit = async (data: any) => {
    console.log(data);
    if (!token) {
      return;
    }
    const firstNameValue = data.firstName;
    const lastNameValue = data.secondName;
    const emailValue = data.email;
    const updatedData = {
      firstName: firstNameValue,
      secondName: lastNameValue,
      email: emailValue,
      userName: "test",
      shoeSize: "",
    };
    // console.log(firstNameValue, lastNameValue, emailValue);
    const response = await dispatch(
      EditUserData({ token, userData: updatedData }),
    );
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/profile");
    }
    console.log();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full justify-center bg-[#EDEDED] pt-10"
    >
      {!isLoading && (
        <div className="w-[500px]">
          <h1 className="text-[44px] font-bold text-[#242424]"> Profile</h1>
          <span className="text-[20px] text-[#242424]">
            Change your profile settings
          </span>
          <div>
            <EditProfileInput
              register={register}
              inputName="firstName"
              errors={errors}
            />
            <EditProfileInput
              register={register}
              inputName="secondName"
              errors={errors}
            />
            <EditProfileInput
              register={register}
              inputName="email"
              errors={errors}
            />
          </div>
          <EditProfileInputButton buttonName="Submit" />
          <EditProfileInputButton buttonName="Cancel" />
        </div>
      )}
    </form>
  );
};
export default EditProfleForm;
