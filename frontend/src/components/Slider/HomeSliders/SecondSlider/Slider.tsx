import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { Navigation, Scrollbar, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { secondSlider } from "../../../../assets/SliderAssets/Slider";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = secondSlider.length - 1;
  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex);
  };
  return (
    <div className="relative">
      <div
        className={`${styles.customSwiperButtonNext} ${
          currentSlide === totalSlides ? "bg-gray-200" : ""
        }`}
      >
        <ChevronRight />
      </div>

      <div
        className={`${styles.customSwiperButtonPrev} ${
          currentSlide === 0 ? "bg-gray-200" : ""
        }`}
      >
        <ChevronLeft />
      </div>
      <Swiper
        className={styles.root}
        modules={[Navigation, Scrollbar, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={false}
        pagination
        navigation={{
          nextEl: `.${styles.customSwiperButtonNext}`,
          prevEl: `.${styles.customSwiperButtonPrev}`,
        }}
        onSlideChange={handleSlideChange}
      >
        {secondSlider.map((obj, id) => (
          <SwiperSlide className={styles.root_slider} key={id}>
            <Link className={styles.slider_link} to={obj.path}>
              <img className={styles.slider_img} src={obj.img} alt={obj.alt} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
