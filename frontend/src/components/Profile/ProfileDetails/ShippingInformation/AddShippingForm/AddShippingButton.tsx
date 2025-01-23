import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../redux/hook";
import { EditUserData } from "../../../../../redux/thunks/profileThunks";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

const AddShippingButton = ({
  buttonName,
  setIsCountrySelectedError,
  country,
}: {
  buttonName: string;
  setIsCountrySelectedError: Dispatch<SetStateAction<boolean>>;
  country: string;
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    localStorage.setItem("editShipping", "");
    if (buttonName === "Submit") {
      if (country && country.length === 0) {
        setIsCountrySelectedError(true);
        return;
      }
      return;
    } else if (buttonName === "Cancel") {
      navigate("/profile");
    }
  };
  return (
    <button
      onClick={handleButtonClick}
      className={clsx(
        "transition-common text-md min-w-auto relative inline-flex h-[42px] select-none appearance-none items-center justify-center whitespace-nowrap rounded-full border-[0.5px] border-[#0F0F0F] px-5 py-2.5 align-middle font-semibold normal-case leading-[1.375] outline-2 outline-offset-2 outline-transparent duration-200",
        buttonName === "Submit" &&
          "bg-[#242424] text-[#FFFFFF] hover:bg-[#2E2E2E]",
        buttonName === "Cancel" &&
          "bg-[#FFFFFF] text-[#242424] hover:bg-[#E5E5E5]",
      )}
    >
      {buttonName}
    </button>
  );
};
export default AddShippingButton;
