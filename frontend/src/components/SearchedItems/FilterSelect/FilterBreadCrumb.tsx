import { useNavigate } from "react-router-dom";

const FilterBreadCrumb = () => {
  const navigate = useNavigate();
  return (
    <div>
      <span
        onClick={() => navigate("/")}
        className="text-blackGray cursor-pointer"
      >
        Home
      </span>
      <span className="text-blackGray"> / </span>
      <span className="text-blackGray border-blackGray cursor-pointer border-b-2">
        Search
      </span>
    </div>
  );
};
export default FilterBreadCrumb;
