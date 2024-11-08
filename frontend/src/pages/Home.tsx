import React, { useEffect } from "react";
import Slider from "../components/Slider/Slider";

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
import Apparel from "../assets/images/HolidayCampaign_XpressShipApparel_Evergreen_SecondaryA.webp";
import Wallet from "../assets/images/Wallets-Card_Holders-Banners-ENSecondaryB.webp";

import {
  firstCardAssets,
  secondCardAssets,
} from "../assets/ImgSection/ImgSection";
import { useFetchHomePage } from "../hooks/useFetchHomePage.tsx";
const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { featuredItems, trendingItems, featuredAccessories } = useAppSelector(
    (state) => state.homeItems,
  );

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useUserSectionFetchQuery({});

  const {
    data: trendingData,
    isLoading: trendingLoading,
    ref: refTrending,
  } = useFetchHomePage("trending", setTrendingItems);

  const {
    data: featuredData,
    isLoading: featuredLoading,
    ref: refFeatured,
  } = useFetchHomePage("featured", setFeaturedItems);

  const {
    data: accessoriesData,
    isLoading: accessoriesLoading,
    ref: refFeaturedAccessories,
  } = useFetchHomePage("featuredAccessories", setFeaturedItems);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

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

      <ImageSection cardAssets={firstCardAssets} />

      <div ref={refTrending}>
        <MainSection
          mainTitle={trendingItems.title}
          items={trendingItems.data}
          description={trendingItems.description}
          status={trendingLoading}
        />
      </div>

      <div ref={refFeatured}>
        <MainSection
          mainTitle={featuredItems.title}
          items={featuredItems.data}
          description={featuredItems.description}
          status={featuredLoading}
        />
      </div>

      <div ref={refFeaturedAccessories}>
        <MainSection
          mainTitle={featuredAccessories.title}
          items={featuredAccessories.data}
          description={featuredAccessories.description}
          status={accessoriesLoading}
        />
      </div>

      <div className="mb-10 mt-28 flex gap-5">
        <img
          className="cursor-pointer rounded-2xl"
          src={Apparel}
          alt="Apparel"
        />
        <img className="cursor-pointer rounded-2xl" src={Wallet} alt="Wallet" />
      </div>
      <ImageSection cardAssets={secondCardAssets} />

      {userError && <div className="text-red-500">Error loading user data</div>}
    </div>
  );
};

export default Home;
