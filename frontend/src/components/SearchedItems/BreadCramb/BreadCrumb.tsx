import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";
import { setSearchValue } from "../../../redux/slices/searchSlice";
import BreadCrumbkeleton from "./BreadCrumbSkeleton";
import BreadCrumbSkeleton from "./BreadCrumbSkeleton";

const FilterBreadCrumb = ({ isLoading }: { isLoading: boolean }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleBackToMainPage = () => {
    navigate("/");
    dispatch(setSearchValue(""));
  };
  return (
    <div className="flex gap-2">
      <span
        onClick={handleBackToMainPage}
        className="h-7 cursor-pointer text-blackGray"
      >
        {isLoading ? <BreadCrumbSkeleton /> : "Home"}
      </span>
      <span className="text-blackGray"> / </span>
      <span className="h-7 cursor-pointer border-b-2 border-blackGray text-blackGray">
        {isLoading ? <BreadCrumbSkeleton /> : "Search"}
      </span>
    </div>
  );
};
export default FilterBreadCrumb;
