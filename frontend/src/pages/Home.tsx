import React, { useEffect, useState } from "react";

import Slider from "../components/Slider/Slider";
import {
  mainSectionFetch,
  userSectionFetch,
} from "../redux/slices/homeItemsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useInView } from "react-intersection-observer";

import UserSection from "../components/Sections/UserSection/UserSection";
import MainSection from "../components/Sections/MainSection/MainSection";
import ImageSection from "../components/Sections/ImageSection/ImageSection";
import { useUserSectionFetchQuery } from "../redux/api/shoesApiSlice";
import Skeleton from "../components/Cards/MainCard/Skeleton";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const [fetchData, setFetchData] = useState(false);
  const { recentlyViewedItems, recomendedItems, mainSection } = useAppSelector(
    (state) => state.homeItems
  );
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const { data, error, isLoading } = useUserSectionFetchQuery({});

  React.useEffect(() => {
    if (inView) {
      dispatch(mainSectionFetch(1));
    }
  }, [inView]);
  React.useEffect(() => {
    if (inView2) {
      dispatch(mainSectionFetch(2));
    }
  }, [inView2]);
  // const refMainSection1 = useFetchOnView(() => mainSectionFetch(1));
  // const refMainSection2 = useFetchOnView(() => mainSectionFetch(2)); по какой то причина запускается бесконечный цикл

  return (
    <div className="mt-6">
      <Slider />
      <UserSection
        mainTitle={data ? data.recentlyViewed.title : ""}
        items={data ? data.recentlyViewed.data : []}
        description={data ? data.recentlyViewed.description : ""}
      />
      <UserSection
        mainTitle={data ? data.featuredItems.title : ""}
        items={data ? data.featuredItems.data : []}
        description={data ? data.featuredItems.description : ""}
      />

      <ImageSection />
      <div ref={ref}>
        <MainSection
          status={mainSection[1].status}
          mainTitle={mainSection[1].data.title}
          items={mainSection[1].data.data}
          description={mainSection[1].data.description}
        />
      </div>
      <div ref={ref2}>
        <MainSection
          status={mainSection[2].status}
          mainTitle={mainSection[2].data.title}
          items={mainSection[2].data.data}
          description={mainSection[2].data.description}
        />
      </div>
    </div>
  );
};

export default Home;
