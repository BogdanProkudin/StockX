import React from "react";
import { Link } from "react-router-dom";

const ProfileFavorites = () => {
  return (
    <div className="profileContainer">
      <div className="mb-10 flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold">Favorites</h1>
        <button className="rounded-3xl bg-black px-4 py-[6px] text-white">
          Create List
        </button>
      </div>

      <div className="flex gap-10">
        <div>
          <Link to="/favorites/all-favorites">
            <div className="mb-2 h-[123px] w-[194px] cursor-pointer rounded-lg border bg-slate-50 transition-all duration-300 ease-in-out hover:bg-white"></div>
          </Link>
          <h1 className="font-bold">All Favorites</h1>
          <span className="text-base">0 Items</span>
        </div>

        <div className="mb-2 flex h-[123px] w-[194px] cursor-pointer items-center justify-center rounded-lg border transition-all duration-300 ease-in-out hover:bg-white">
          <p>
            +
            <span className="text-sm font-bold underline">
              Create Your List
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileFavorites;
