import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";
import {
  setIsSearching,
  setSearchValue,
} from "../../../redux/slices/searchSlice";

type SearchedItemProps = {
  image: string;
  brand: string;
  name: string;
  color: string;
  slug: string;
};
const SearchedItem: React.FC<SearchedItemProps> = ({
  image,
  brand,
  name,
  color,
  slug,
}) => {
  const formattedUrl = slug.slice(0, -6);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setSearchValue(""));
    dispatch(setIsSearching(false));
  };
  return (
    <Link onClick={handleClick} to={`/${name}`}>
      <div className="smallScreen:hover:border-r-4 flex w-full cursor-pointer items-center border-b-2 border-b-lightGray pl-2 pr-2 transition-all duration-100 hover:border-r-8 hover:border-r-green-900">
        <img
          className="smallScreen:h-16 smallScreen:w-20 m-5 h-28 w-32"
          src={image}
        />
        <div className="flex flex-col">
          <div className="text-[12px] uppercase leading-3">{brand}</div>
          <div className="smallScreen:font-semibold smallScreen:text-sm text-lg font-bold uppercase leading-5 text-black">
            {name}
          </div>
          <div className="smallScreen:text-[11px] m-0 text-[13px] font-bold uppercase leading-5">
            {color}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchedItem;
