import axios from "axios";
import React, { useEffect, useState } from "react";
import { FullProductProps } from "../../@types/userCardTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import styles from "./styles.module.scss";
import ProductCard from "../Cards/MainCard/MainCard";

interface RelatedProductsProps {
  brand: string;
  title: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ brand, title }) => {
  const [product, setProduct] = useState<FullProductProps[] | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = product ? product.length - 1 : 20;

  const searchTitle = title.split(" ").slice(0, 3).join(" ");
  console.log(searchTitle);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex);
  };
  useEffect(() => {
    const fetchBrandProducts = async () => {
      try {
        const apiUrl = `https://api.sneakersapi.dev/api/v2/products?brand=${brand}&search=${searchTitle}`;
        const { data } = await axios.get(apiUrl, {
          headers: { Authorization: "f-2895d084cba594772c79255a5fb658d0" },
        });
        setProduct(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBrandProducts();
  }, []);
  console.log(currentSlide === 0);

  return (
    <div className="border-{#a4a4a4} mb-5 border-b">
      <h1 className="mb-4 text-xl font-bold">Related Products</h1>
      <div className="relative flex">
        <div
          className={`${styles.customSwiperButtonNext} ${
            currentSlide + 4 === totalSlides ? styles.hidden : ""
          }`}
        >
          🡲
        </div>
        <div
          className={`${styles.customSwiperButtonPrev} ${
            currentSlide === 0 ? styles.hidden : ""
          }`}
        >
          🡰
        </div>
        <Swiper
          spaceBetween={0}
          slidesPerView={5}
          slidesPerGroup={5}
          modules={[Navigation]}
          navigation={{
            nextEl: `.${styles.customSwiperButtonNext}`,
            prevEl: `.${styles.customSwiperButtonPrev}`,
          }}
          onSlideChange={handleSlideChange}
        >
          {product?.map((obj, id) => (
            <SwiperSlide className="mb-4 flex justify-center" key={id}>
              <ProductCard
                image={obj.image}
                slug={obj.slug}
                title={obj.title}
                avg_price={obj.avg_price}
                min_price={obj.min_price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedProducts;
