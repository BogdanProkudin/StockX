import { useNavigate } from "react-router-dom";

const EditProfileInputButton = ({
  firstNameValue,
  buttonName,
  lastNameValue,
}: {
  firstNameValue?: string;
  buttonName: string;
  lastNameValue?: string;
}) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    if (buttonName === "Submit") {
      console.log(firstNameValue, lastNameValue);
    } else {
      navigate("/profile");
    }
  };
  return (
    <button
      onClick={handleButtonClick}
      form="editProfileForm"
      type="submit"
      className="btn btn-primary"
    >
      {buttonName}
    </button>
  );
};
export default EditProfileInputButton;
