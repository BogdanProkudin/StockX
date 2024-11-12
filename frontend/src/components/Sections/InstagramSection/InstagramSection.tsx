import React from "react";
import { useAppSelector } from "../../../redux/hook";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

import "swiper/css";
import TitleSkeleton from "../TitleSkeleton";

const InstagramSection = () => {
  const instagramSectionItems = useAppSelector(
    (state) => state.homeItems.instagramSectionItems,
  );
  console.log(instagramSectionItems);

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
      <div className="mt-5 flex justify-between">
        {instagramSectionItems.length > 0 ? (
          <>
            <Swiper
              spaceBetween={10}
              slidesPerView={4.1}
              slidesPerGroup={4}
              modules={[Navigation]}
              navigation
            >
              {instagramSectionItems.map((obj, id) => (
                <SwiperSlide key={id}>
                  <div className="group relative h-[292px] w-[292px] cursor-pointer overflow-hidden rounded-2xl transition-all hover:bg-black">
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
          </>
        ) : (
          "Loading"
        )}
      </div>
    </div>
  );
};

export default InstagramSection;
