import FilterBreadCrumb from "./FilterSelect/FilterBreadCrumb";
import FilterSelect from "./FilterSelect/FilterSelect";

const SearchedContent = () => {
  return (
    <div className="mt-3 flex h-[400px] w-24 min-w-[1240px] justify-between bg-slate-950">
      <div className="h-[300px] w-[300px] bg-red-500"></div>
      <div className="h-[300px] w-[927px] bg-amber-500 p-4">
        <div className="flex h-10 justify-between">
          <FilterBreadCrumb />
          <FilterSelect />
        </div>
        <h1 className="text-blackTextColor text-lg">
          Browse <b>1000</b> results for "nike"
        </h1>
      </div>
    </div>
  );
};

export default SearchedContent;
