import React from "react";

const ProfileFavorites = () => {
  return (
    <div className="profileContainer">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold">Favorites</h1>
        <button className="rounded-3xl bg-black px-4 py-[6px] text-white">
          Create List
        </button>
      </div>
    </div>
  );
};

export default ProfileFavorites;
