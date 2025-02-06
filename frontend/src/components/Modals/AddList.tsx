import React, { useState } from "react";
import { useAppSelector } from "../../redux/hook";

const AddList = () => {
  const favoriteList = useAppSelector(
    (state) => state.favoriteSlice.favoriteList,
  );
  const [value, setValue] = useState("");
  const onClickCreateList = () => {
    console.log("clicked");
  };
  return (
    <div className="mt-2 w-full rounded-xl px-2 py-1 shadow-md">
      <div className="flex items-center gap-3">
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="w-4/5 rounded-lg border px-3 py-2 outline-none"
          type="text"
          placeholder="Create a list"
        />
        <button
          disabled={value.length < 3}
          onClick={onClickCreateList}
          className="rounded-lg bg-black px-3 py-2 text-white transition-all duration-300 ease-in-out hover:bg-gray-700"
        >
          Create
        </button>
      </div>
      <ul>
        <li className="my-2 cursor-not-allowed opacity-60">
          <input
            className="mr-2 cursor-not-allowed"
            checked
            disabled
            type="checkbox"
          />
          {favoriteList.title}
        </li>
      </ul>
    </div>
  );
};

export default AddList;
