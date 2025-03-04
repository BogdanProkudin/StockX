import { useState } from "react";
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
import { productProps } from "../../../@types/userCardTypes";
import { useMediaQuery } from "@mui/material";

const InstagramSection = () => {
  const instagramSectionItems = useAppSelector(
    (state) => state.homeItems.instagramSectionItems,
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalSlide, setModaliSlide] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const isLargeScreen = useMediaQuery("(max-width: 1300px)");
  const [selectedItem, setSelectedItem] = useState<{
    image: string;
    data: productProps[];
  } | null>(null);

  const totalSlides = instagramSectionItems.length - 1;

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex);
  };
  const openModal = (
    item: { image: string; data: productProps[] },
    id: number,
  ) => {
    setSelectedItem(item);
    setIsModal(true);
    setModaliSlide(id);
  };

  const closeModal = () => {
    setIsModal(false);
    setSelectedItem(null);
    setModaliSlide(0);
  };

  return (
    <div className="mb-5">
      <h1 className="text-xl font-bold">
        {instagramSectionItems.length < 2 ? (
          <TitleSkeleton />
        ) : (
          "As Seen On Instagram"
        )}
      </h1>
      <p className="text-sm">
        {instagramSectionItems.length < 2 ? (
          <TitleSkeleton />
        ) : (
          "Use #GotItOnStockX and you could be featured."
        )}
      </p>
      <div className="relative mt-5 flex justify-between">
        {instagramSectionItems.length < 2 ? (
          <Skeleton />
        ) : (
          <>
            {!isLargeScreen && (
              <div className={styles.customSwiperButtonNext}>🡲</div>
            )}
            {!isLargeScreen && (
              <div className={styles.customSwiperButtonPrev}>🡰</div>
            )}
            <Swiper
              spaceBetween={10}
              slidesPerView={4.1}
              slidesPerGroup={4}
              scrollbar={{ draggable: true, dragSize: 1 }}
              loop={true}
              modules={[Navigation]}
              navigation={{
                nextEl: `.${styles.customSwiperButtonNext}`,
                prevEl: `.${styles.customSwiperButtonPrev}`,
              }}
              onSlideChange={handleSlideChange}
            >
              {instagramSectionItems.map((obj, id) => (
                <SwiperSlide className="flex: min-w-[292px]" key={id}>
                  <div
                    onClick={() => openModal(obj, id)}
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
              <Modal closeModal={closeModal} modalSlide={modalSlide} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InstagramSection;
