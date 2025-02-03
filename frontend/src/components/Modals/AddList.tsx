import React from "react";
import { useAppSelector } from "../../redux/hook";

const AddList = () => {
  const favoriteList = useAppSelector(
    (state) => state.favoriteSlice.favoriteList,
  );
  console.log("list", favoriteList.title);

  return (
    <div className="mt-2 w-full border border-black px-2 py-1">
      <div className="flex items-center gap-3">
        <input
          className="w-4/5 rounded-lg border px-3 py-2 outline-none"
          type="text"
          placeholder="Create a list"
        />
        <button className="rounded-lg bg-black px-3 py-2 text-white transition-all duration-300 ease-in-out hover:bg-gray-700">
          Create
        </button>
      </div>
      <ul>
        <li>
          <input type="checkbox" />
          All Favorites
        </li>
      </ul>
    </div>
  );
};

export default AddList;
