import React, { useState } from "react";

import styles from "./styles.module.scss";

import { Link } from "react-router-dom";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { sliderArr } from "../../../../assets/SliderAssets/Slider";
import "swiper/css";
import "swiper/css/navigation";

import "swiper/css/scrollbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const onClickNextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };
  const onClickPrevSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };
  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex);
  };
  return (
    <div className="relative">
      <div onClick={onClickNextSlide} className={styles.customSwiperButtonNext}>
        <ChevronRight />
      </div>

      <div onClick={onClickPrevSlide} className={styles.customSwiperButtonPrev}>
        <ChevronLeft />
      </div>
      <Swiper
        className={styles.root}
        modules={[Navigation, Scrollbar, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 20000, disableOnInteraction: false }}
        navigation={{
          nextEl: `.${styles.customSwiperButtonNext}`,
          prevEl: `.${styles.customSwiperButtonPrev}`,
        }}
        onSlideChange={handleSlideChange}
      >
        {sliderArr.map((obj, id) => (
          <SwiperSlide className={styles.root_slider} key={id}>
            <div>
              <Link className={styles.slider_link} to={obj.path}>
                <img
                  className={styles.slider_img}
                  src={obj.img}
                  alt={obj.alt}
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
