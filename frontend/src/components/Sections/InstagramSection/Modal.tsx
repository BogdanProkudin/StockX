import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import { X } from "lucide-react";

import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAppSelector } from "../../../redux/hook";
interface Imodal {
  closeModal: () => void;
  modalSlide: number;
}
const Modal: React.FC<Imodal> = ({ closeModal, modalSlide }) => {
  const instagramSectionItems = useAppSelector(
    (state) => state.homeItems.instagramSectionItems,
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const onClickFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  useEffect(() => {
    const handleClose = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClose);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClose);
    };
  }, [closeModal]);
  console.log("Title");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="h-[637px] w-[1120px] rounded-3xl bg-white text-black shadow-lg"
      >
        <Swiper
          className={styles.customButtons}
          spaceBetween={0}
          slidesPerView={1}
          slidesPerGroup={1}
          modules={[Navigation]}
          navigation={{}}
          initialSlide={modalSlide}
        >
          {instagramSectionItems.map((obj, id) => (
            <SwiperSlide key={id}>
              <div className="flex">
                <img
                  className="h-[637px] w-[637px] rounded-bl-2xl rounded-tl-2xl"
                  src={obj.image}
                  alt={obj.image}
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
                  <div>
                    <div className="mb-3 flex items-center gap-1">
                      <h1 className="text-xl">Shop this look</h1>
                      <span className="text-md">({obj.data.length} item)</span>
                    </div>

                    <div className="flex flex-wrap justify-between">
                      {obj.data.map((obj, id) => (
                        <Link to={`/${obj.id}`} key={id}>
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
                            <b className="f font-mono text-[23px]">
                              €{obj.avg_price}
                            </b>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Modal;
