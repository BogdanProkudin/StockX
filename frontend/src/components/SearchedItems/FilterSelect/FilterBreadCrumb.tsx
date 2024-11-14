import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";
import { setSearchValue } from "../../../redux/slices/searchSlice";

const FilterBreadCrumb = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleBackToMainPage = () => {
    navigate("/");
    dispatch(setSearchValue(""));
  };
  return (
    <div>
      <span
        onClick={handleBackToMainPage}
        className="cursor-pointer text-blackGray"
      >
        Home
      </span>
      <span className="text-blackGray"> / </span>
      <span className="cursor-pointer border-b-2 border-blackGray text-blackGray">
        Search
      </span>
    </div>
  );
};
export default FilterBreadCrumb;
