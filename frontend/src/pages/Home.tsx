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
const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { recentlyViewedItems, recomendedItems, mainItems } = useAppSelector(
    (state) => state.homeItems
  );
  React.useEffect(() => {
    dispatch(userSectionFetch());
  }, []);
  React.useEffect(() => {
    dispatch(mainSectionFetch());
  }, []);
  console.log(mainItems);

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
        mainTitle={mainItems.title}
        items={mainItems.data}
        description={mainItems.description}
      />
      <ImageSection />
    </div>
  );
};

export default Home;
