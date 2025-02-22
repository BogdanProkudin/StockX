import { CirclePlus, Heart, Share } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchFavoriteList } from "../../redux/slices/favoriteSlice";

interface BreadCrumbsProps {
  brand: string;
  category: string;
  title: string;
  id: string;
  slug: string;
}
const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  category,
  brand,
  title,
  id,
  slug,
}) => {
  const dispatch = useAppDispatch();
  const firstRender = useRef(true);
  const { productAdded, favoriteList } = useAppSelector(
    (state) => state.favoriteSlice,
  );
  const type = category.charAt(0).toUpperCase() + category.slice(1);
  const [isFav, setIsFav] = useState(false);
  useEffect(() => {
    if (firstRender.current || productAdded.checked) {
      dispatch(fetchFavoriteList());
    }
    firstRender.current = false;
  }, [dispatch, productAdded]);
  useEffect(() => {
    if (favoriteList.length > 0 && favoriteList[0]?.data) {
      setIsFav(favoriteList[0].data.some((item) => item.id === id));
    } else {
      setIsFav(false);
    }
  }, [favoriteList, id]);
  const breadCrumbArr = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: `/search?category=${type}`,
      name: type,
    },
    {
      link: `/search?brand=${brand}`,
      name: brand,
    },
    {
      link: `/${slug.slice(0, -6)}`,
      name: title,
    },
  ];
  const breadcrumbs = breadCrumbArr.map((obj, id) => (
    <React.Fragment key={id}>
      <Link to={obj.link}>
        <span
          className={`${obj.name === title ? "cursor-default border-b border-black" : "cursor-pointer opacity-60 transition-all duration-300 ease-in-out hover:opacity-100"}`}
        >
          {obj.name}
        </span>
      </Link>
      <span
        className={`${obj.name === title ? "hidden" : "mx-2 cursor-default text-base"}`}
      >
        /
      </span>
    </React.Fragment>
  ));

  return (
    <div className="flex items-center justify-between py-6">
      <div className="text-[13px]">{breadcrumbs}</div>
      <div className="flex items-center gap-3">
        <CirclePlus className="cursor-pointer" size={22} />
        <Heart
          fill={isFav ? "black" : "none"}
          className="cursor-pointer"
          size={22}
        />
        <Share className="cursor-pointer" size={22} />
      </div>
    </div>
  );
};

export default BreadCrumbs;
