import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getOneList } from "../../../redux/slices/favoriteSlice";

const FavoriteList = () => {
  const dispatch = useAppDispatch();
  const { oneList, oneListStatus } = useAppSelector(
    (state) => state.favoriteSlice,
  );
  const { title } = useParams();
  useEffect(() => {
    if (title) {
      dispatch(getOneList(title));
    }
  }, []);
  return (
    <div>
      {oneListStatus == "loading" ? (
        <>Loading...</>
      ) : oneListStatus === "error" ? (
        <>Error...</>
      ) : (
        <div>
          <h1>{oneList.titleList}</h1>
          <div>
            {oneList.data.map((el, index) => (
              <div key={index}>
                <img src={el.image} alt={el.title} />
                <h1>{el.title}</h1>
                <span>{el.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteList;
