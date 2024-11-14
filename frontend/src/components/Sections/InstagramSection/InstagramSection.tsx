import React, { useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import styles from "./styles.module.scss";
import "swiper/css";
import TitleSkeleton from "../TitleSkeleton";
import Modal from "./Modal";
import Skeleton from "./Skeleton";

const InstagramSection = () => {
  const instagramSectionItems = useAppSelector(
    (state) => state.homeItems.instagramSectionItems,
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = instagramSectionItems.length - 1;

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex);
  };
  const [isModal, setIsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    (typeof instagramSectionItems)[0] | null
  >(null);
  const openModal = (item: (typeof instagramSectionItems)[0]) => {
    setSelectedItem(item);
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
    setSelectedItem(null);
  };
  return (
    <div className="mb-20">
      <h1 className="text-xl font-bold">
        {instagramSectionItems.length < 1 ? (
          <TitleSkeleton />
        ) : (
          "As Seen On Instagram"
        )}
      </h1>
      <p className="text-sm">
        {instagramSectionItems.length < 1 ? (
          <TitleSkeleton />
        ) : (
          "Use #GotItOnStockX and you could be featured."
        )}
      </p>
      <div className="relative mt-5 flex justify-between">
        {instagramSectionItems.length < 1 ? (
          <Skeleton />
        ) : (
          <>
            <div
              className={`${styles.customSwiperButtonNext} ${
                currentSlide + 3 === totalSlides ? "hidden" : ""
              }`}
            >
              🡲
            </div>

            <div
              className={`${styles.customSwiperButtonPrev} ${
                currentSlide === 0 ? "hidden" : ""
              }`}
            >
              🡰
            </div>
            <Swiper
              spaceBetween={10}
              slidesPerView={4.1}
              slidesPerGroup={4}
              modules={[Navigation]}
              navigation={{
                nextEl: `.${styles.customSwiperButtonNext}`,
                prevEl: `.${styles.customSwiperButtonPrev}`,
              }}
              onSlideChange={handleSlideChange}
            >
              {instagramSectionItems.map((obj, id) => (
                <SwiperSlide key={id}>
                  <div
                    onClick={() => openModal(obj)}
                    className="group relative h-[292px] w-[292px] cursor-pointer overflow-hidden rounded-2xl transition-all duration-100 hover:bg-black"
                  >
                    <img
                      src={obj.image}
                      className="h-full w-full object-cover group-hover:opacity-55"
                      alt={obj.image}
                    />
                    <button className="absolute left-24 top-[115px] z-10 hidden rounded-lg border border-white px-2 py-1 text-white hover:bg-white hover:text-black group-hover:block">
                      Shop Now
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {isModal && selectedItem && (
              <Modal closeModal={closeModal} item={selectedItem} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InstagramSection;
