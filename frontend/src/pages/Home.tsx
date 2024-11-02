import React, { useEffect, useState } from "react";
import Slider from "../components/Slider/Slider";
import FoundItems from "../components/FoundItems/index";
import UserSection from "../components/Sections/UserSection/UserSection";
import MainSection from "../components/Sections/MainSection/MainSection";
import ImageSection from "../components/Sections/ImageSection/ImageSection";
import {
  useLazyMainSectionFetchQuery,
  useUserSectionFetchQuery,
} from "../redux/api/mainApiSlice";
import useFetchOnView from "../hooks/useFetchOnView";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  setFeaturedAccessories,
  setFeaturedItems,
  setTrendingItems,
} from "../redux/slices/homeItemsSlice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { featuredItems, trendingItems, featuredAccessories } = useAppSelector(
    (state) => state.homeItems,
  );
  const searchInputValue = useAppSelector(
    (state) => state.searchSlice.searchValue,
  );

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useUserSectionFetchQuery({});

  const [fetchMainSection, { data: mainData, isLoading: mainLoading }] =
    useLazyMainSectionFetchQuery({});

  const refTrending = useFetchOnView({
    fetchFunction: fetchMainSection,
    sectionName: "trending",
    page: null,
    threshold: 0,
    triggerOnce: true,
  });
  const refFeatured = useFetchOnView({
    fetchFunction: fetchMainSection,
    sectionName: "featured",
    page: null,
    threshold: 0.2,
    triggerOnce: true,
  });
  const refFeaturedAccessories = useFetchOnView({
    fetchFunction: fetchMainSection,
    sectionName: "featuredAccessories",
    page: null,
    threshold: 0.2,
    triggerOnce: true,
  });
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);
  useEffect(() => {
    if (mainData) {
      console.log("Received mainData:", mainData);
      if (mainData.title === "Trending Sneakers") {
        dispatch(setTrendingItems(mainData));
      } else if (mainData.title === "Featured Apparel") {
        dispatch(setFeaturedItems(mainData));
      } else if (mainData.title === "Featured Accessories") {
        dispatch(setFeaturedAccessories(mainData));
      }
    }
  }, [mainData]);
  console.log(mainData);

  const recentlyViewed = userData?.recentlyViewed || {
    title: "",
    data: [],
    description: "",
  };
  const recommendedItems = userData?.recommendedItems || {
    title: "",
    data: [],
    description: "",
  };

  if (searchInputValue.length > 0) {
    return (
      <div className="mt-6 flex items-center justify-center">
        <FoundItems />
      </div>
    );
  }

  return (
    <div className="mt-6">
      <Slider />
      <UserSection
        mainTitle={recentlyViewed.title}
        items={recentlyViewed.data}
        description={recentlyViewed.description}
        status={userLoading}
      />
      <UserSection
        mainTitle={recommendedItems.title}
        items={recommendedItems.data}
        description={recommendedItems.description}
        status={userLoading}
      />

      <ImageSection />

      <div ref={refTrending}>
        <MainSection
          mainTitle={trendingItems.title}
          items={trendingItems.data}
          description={trendingItems.description}
          status={mainLoading}
        />
      </div>

      <div ref={refFeatured}>
        <MainSection
          mainTitle={featuredItems.title}
          items={featuredItems.data}
          description={featuredItems.description}
          status={mainLoading}
        />
      </div>
      <div ref={refFeaturedAccessories}>
        <MainSection
          mainTitle={featuredAccessories.title}
          items={featuredAccessories.data}
          description={featuredAccessories.description}
          status={mainLoading}
        />
      </div>

      {userError && <div className="text-red-500">Error loading user data</div>}
    </div>
  );
};

export default Home;
