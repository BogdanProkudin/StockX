import { useState } from "react";

const CategoryItem = () => {
  const [isShowDropDown, setIsShowDropDown] = useState(false);

  return (
    <div
      onClick={() => setIsShowDropDown(!isShowDropDown)}
      className="flex h-full w-full cursor-pointer flex-col bg-lime-600"
    >
      <div className="flex items-center justify-between p-4">
        <p className="select-none pb-0 text-base font-semibold text-blackTextColor">
          CATEGORY
        </p>

        <svg
          viewBox="0 0 50 50"
          focusable="false"
          className={`h-[1rem] w-[1rem] transform pb-0 transition-transform duration-300 ${isShowDropDown ? "rotate-0" : "rotate-180"}`}
        >
          <path
            fill="currentColor"
            d="M40.2 35.7999L25 19.6L9.79999 35.7999L7.09999 33.2999L25 14.2L42.9 33.2999L40.2 35.7999Z"
          ></path>
        </svg>
      </div>
      <div
        className={`flex flex-col overflow-hidden bg-neutral-900 pl-6 transition-all duration-300 ease-in-out ${
          isShowDropDown ? "max-h-64" : "max-h-0"
        }`}
      >
        <a className="pt-2 hover:underline">Sneakers</a>
        <a className="pt-2 hover:underline">Apprarel</a>
        <a className="pt-2 hover:underline">Shoes</a>
        <a className="pt-2 hover:underline">Accessories</a>
        <a className="pt-2 hover:underline">Sneakers</a>
      </div>
    </div>
  );
};

export default CategoryItem;
