import React from "react";

import Slider from "../components/Slider/Slider";
import {
  mainSectionFetch,
  userSectionFetch,
} from "../redux/slices/homeItemsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

import UserSection from "../components/Sections/UserSection/UserSection";
import MainSection from "../components/Sections/MainSection/MainSection";
import ImageSection from "../components/Sections/ImageSection/ImageSection";
import useFetchOnView from "../hooks/useFetchOnView";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { recentlyViewedItems, recomendedItems, mainSection } = useAppSelector(
    (state) => state.homeItems
  );

  React.useEffect(() => {
    dispatch(userSectionFetch());
  }, []);

  const refMainSection1 = useFetchOnView(() => mainSectionFetch(1));
  const refMainSection2 = useFetchOnView(() => mainSectionFetch(2));
  return (
    <div className="mt-6">
      <Slider />
      <UserSection
        mainTitle={recentlyViewedItems.title}
        items={recentlyViewedItems.data}
        description={recentlyViewedItems.description}
      />
      <UserSection
        mainTitle={recomendedItems.title}
        items={recomendedItems.data}
        description={recomendedItems.description}
      />
      <ImageSection />
      <div ref={refMainSection1}>
        <MainSection
          status={mainSection[1].status}
          mainTitle={mainSection[1].data.title}
          items={mainSection[1].data.data}
          description={mainSection[1].data.description}
        />
      </div>
      <div ref={refMainSection2}>
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
