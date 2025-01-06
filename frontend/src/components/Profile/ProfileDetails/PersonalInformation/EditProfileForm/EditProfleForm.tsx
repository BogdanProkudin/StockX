import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../redux/hook";
import EditProfileInput from "./EditProfileInput";
import EditProfileInputButton from "./EditProfileInputButton";

const EditProfleForm = () => {
  const userData = useAppSelector((state) => state.profileSlice.userData);
  const [isLoading, setIsLoading] = useState(true);
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [userNameValue, setUserNameValue] = useState("");
  useEffect(() => {
    if (userData) {
      setIsLoading(false);
      setFirstNameValue(userData.firstName);
      setLastNameValue(userData.secondName);
      setUserNameValue(userData.userName);
    }
  }, [userData]);
  return (
    <div className="flex w-full justify-center bg-[#EDEDED] pt-10">
      {!isLoading && (
        <div className="w-[500px]">
          <h1 className="text-[44px] font-bold text-[#242424]"> Profile</h1>
          <span className="text-[20px] text-[#242424]">
            Change your profile settings
          </span>
          <div>
            <EditProfileInput
              inputName="First Name"
              setValue={setFirstNameValue}
              value={firstNameValue}
            />
            <EditProfileInput
              inputName="Second Name"
              setValue={setLastNameValue}
              value={lastNameValue}
            />
          </div>
          <EditProfileInputButton
            firstNameValue={firstNameValue}
            buttonName="Submit"
            lastNameValue={lastNameValue}
          />
          <EditProfileInputButton
            firstNameValue={firstNameValue}
            buttonName="Cancel"
            lastNameValue={lastNameValue}
          />
        </div>
      )}
    </div>
  );
};
export default EditProfleForm;
