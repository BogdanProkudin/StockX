import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { fetchFavoriteList } from "../../../redux/slices/favoriteSlice";

const ProfileFavorites = () => {
  const dispatch = useAppDispatch();
  const { favoriteList, favoriteListStatus } = useAppSelector(
    (state) => state.favoriteSlice,
  );
  useEffect(() => {
    dispatch(fetchFavoriteList());
  }, []);
  return (
    <div className="profileContainer">
      <div className="mb-10 flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold">Favorites</h1>
        <button className="rounded-3xl bg-black px-4 py-[6px] text-white">
          Create List
        </button>
      </div>
      {favoriteListStatus === "loading" ? (
        <>Loading</>
      ) : favoriteListStatus === "error" ? (
        <>Failed</>
      ) : (
        favoriteListStatus === "success" && (
          <div className="flex flex-wrap gap-10">
            {favoriteList.map((el, index) => (
              <div key={index}>
                <Link to={`/favorites/${el.titleList}`}>
                  <div className="mb-2 h-[123px] w-[194px] cursor-pointer rounded-lg border bg-slate-50 transition-all duration-300 ease-in-out hover:bg-white"></div>
                </Link>
                <h1 className="font-bold">{el.titleList}</h1>
                <span className="text-base">{el.data.length} Items</span>
              </div>
            ))}
            <div className="mb-2 flex h-[123px] w-[194px] cursor-pointer items-center justify-center rounded-lg border transition-all duration-300 ease-in-out hover:bg-white">
              <p>
                +
                <span className="text-sm font-bold underline">
                  Create Your List
                </span>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProfileFavorites;
