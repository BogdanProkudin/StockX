import React from "react";

import Slider from "../components/Slider/Slider";
import { mainSectionFetch } from "../redux/slices/homeItemsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

import UserSection from "../components/Sections/UserSection/UserSection";
import MainSection from "../components/Sections/MainSection/MainSection";
import ImageSection from "../components/Sections/ImageSection/ImageSection";
const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { recentlyViewedItems, recomendedItems } = useAppSelector(
    (state) => state.homeItems
  );
  React.useEffect(() => {
    dispatch(mainSectionFetch());
  }, []);

  console.log(recentlyViewedItems);

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
      <MainSection
        mainTitle={recomendedItems.title}
        items={recomendedItems.data}
        description={recomendedItems.description}
      />
      <ImageSection />
    </div>
  );
};

export default Home;
