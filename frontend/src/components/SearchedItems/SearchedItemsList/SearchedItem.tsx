import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { Link } from "react-router-dom";

import { SearchItem } from "../../../types/searchTypes";
import { imageNotFound } from "../../../assets/images/imageNotFound";

const SearchedItem: React.FC<SearchItem> = ({
  image,
  title,
  slug,
  avg_price,
}) => {
  const onClickFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <Link
        to={`/${title}`}
        className="mediumScreen:w-full mediumScreen:items-start relative flex h-full w-[200px] cursor-pointer flex-col items-center"
      >
        <button onClick={onClickFavorite} className="absolute right-5">
          <FavoriteBorderIcon />
        </button>
        <img
          className="h-[140px] min-h-[140px] w-full object-contain p-4"
          src={image ? image : imageNotFound}
          alt=""
        />
        <div className="px-4 py-0">
          <h4 className="mb-1">{title}</h4>
          <p className="text-sm text-gray-400">Lowest Ask</p>
          <b className="f font-mono text-[23px]">
            €{Math.round(avg_price) || 0}
          </b>
        </div>
      </Link>
    </>
  );
};

export default SearchedItem;
