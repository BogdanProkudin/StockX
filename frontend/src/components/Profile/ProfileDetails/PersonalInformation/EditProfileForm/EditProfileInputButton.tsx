import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../redux/hook";
import { EditUserData } from "../../../../../redux/thunks/profileThunks";

const EditProfileInputButton = ({ buttonName }: { buttonName: string }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  return (
    <button
      type={buttonName === "Cancel" ? "button" : "submit"}
      className="btn btn-primary"
    >
      {buttonName}
    </button>
  );
};
export default EditProfileInputButton;
