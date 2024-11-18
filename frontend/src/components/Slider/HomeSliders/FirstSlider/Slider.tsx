import React from "react";

import styles from "./styles.module.scss";

import { Link } from "react-router-dom";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import { sliderArr } from "../../../../assets/SliderAssets/Slider";
import "swiper/css";
import "swiper/css/navigation";

import "swiper/css/scrollbar";

const Slider = () => {
  return (
    <Swiper
      className={styles.root}
      modules={[Navigation, Scrollbar, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      navigation
      autoplay={{ delay: 20000, disableOnInteraction: false }}
    >
      {sliderArr.map((obj, id) => (
        <SwiperSlide className={styles.root_slider} key={id}>
          <div>
            <Link className={styles.slider_link} to={obj.path}>
              <img className={styles.slider_img} src={obj.img} alt={obj.alt} />
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
