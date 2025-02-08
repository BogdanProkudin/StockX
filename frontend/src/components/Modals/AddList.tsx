import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { createNewList } from "../../redux/slices/favoriteSlice";

const AddList = () => {
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(
    (state) => state.favoriteSlice.favoriteList,
  );
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const onClickCreateList = () => {
    const list = favoriteList.data.find((el) => el.titleList === value);
    if (!list) {
      dispatch(createNewList(value));
      setValue("");
    } else {
      setError(`The list with name:${value} already exist. Create another one`);
    }
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
          className="cursor-pointer rounded-lg bg-black px-3 py-2 text-white transition-all duration-300 ease-in-out hover:bg-gray-700 disabled:opacity-60"
        >
          Create
        </button>
      </div>
      {error && <span>{error}</span>}
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
        {favoriteList.data.map((obj, id) => (
          <li key={id}>
            <input className="mr-2" type="checkbox" />
            {obj.titleList}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddList;
