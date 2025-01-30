import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useNavigate } from "react-router-dom";
import { setRedirectFromMainPage } from "../../../redux/slices/searchSlice";
import { useAppDispatch } from "../../../redux/hook";
import { variants } from "../../FullProduct/SizePopUp";
import FavoriteModal from "../../Modals/FavoriteModal";

interface ProductCardProps {
  id?: string;
  image: string;
  slug: string;
  title: string;
  variants: variants[];
  avg_price: number;
  min_price: number;
}
const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  variants,
  title,
  avg_price,
  min_price,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const onClickFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenModal(true);
    e.stopPropagation();
  };
  // const formattedUrl = slug.slice(0, -6);
  const price = Math.round(avg_price);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    dispatch(setRedirectFromMainPage(true));
    navigate(`/${title}`);
    console.log("click");
  };

  return (
    <>
      {isOpenModal && (
        <FavoriteModal
          id={id}
          variants={variants}
          image={image}
          title={title}
          price={price}
          min_price={min_price}
          closeModal={() => setIsOpenModal(false)}
        />
      )}
      <div
        onClick={handleClick}
        className="relative flex h-full w-[190px] min-w-[190px] cursor-pointer flex-col items-center"
      >
        <button
          onClick={onClickFavorite}
          className="z-15 absolute right-5 rounded-full p-1 transition-all duration-300 ease-in-out hover:bg-gray-100"
        >
          <FavoriteBorderIcon />
        </button>
        <img
          className="h-[140px] min-h-[140px] w-[160px] p-4"
          src={image}
          alt=""
        />
        <div className="px-4 py-0">
          <h4 className="mb-1 max-h-[96px] overflow-hidden text-ellipsis">
            {title}
          </h4>
          <p className="text-sm text-gray-400">Lowest Ask</p>
          <b className="f font-mono text-[23px]">€{price}</b>
          <p className="w-4/5 bg-gray-100 p-1 text-xs">
            min price: €{min_price}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
