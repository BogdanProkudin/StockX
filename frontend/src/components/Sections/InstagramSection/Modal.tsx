import React, { useEffect } from "react";
import { X } from "lucide-react";
import { userCardProps } from "../../../@types/userCardTypes";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
interface Imodal {
  closeModal: () => void;
  item: {
    image: string;
    data: userCardProps[];
  };
}
const Modal: React.FC<Imodal> = ({ closeModal, item }) => {
  const onClickFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };
  useEffect(() => {}, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-[637px] w-[1120px] overflow-hidden rounded-2xl bg-white text-black shadow-lg">
        <img
          className="h-full w-[637px] rounded-bl-2xl rounded-tl-2xl"
          src={item.image}
          alt={item.image}
        />
        <div className="flex w-full flex-col px-5 py-4">
          <div className="flex justify-end">
            <button
              className="duration-300 hover:bg-gray-200"
              onClick={closeModal}
            >
              <X />
            </button>
          </div>
          <div className="mt-7">
            <div className="mb-3 flex items-center gap-1">
              <h1 className="text-xl">Shop this look</h1>{" "}
              <span className="text-md">({item.data.length} item)</span>
            </div>

            <div className="flex h-[600px] flex-wrap justify-between overflow-scroll">
              {item.data.map((obj, id) => (
                <Link to={`/${obj.title}`} key={id}>
                  <div className="relative mb-10 h-[212px] w-[200px]">
                    <button
                      onClick={onClickFavorite}
                      className="absolute right-5"
                    >
                      <FavoriteBorderIcon />
                    </button>
                    <img
                      className="h-[140px] w-[180px] p-4"
                      src={obj.image}
                      alt=""
                    />
                    <h4 className="mb-1">{obj.title}</h4>
                    <p className="text-sm text-gray-400">Lowest Ask</p>
                    <b className="f font-mono text-[23px]">€{obj.base_price}</b>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
