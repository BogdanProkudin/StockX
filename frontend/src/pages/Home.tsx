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
const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.searchSlice.searchValue);
  const { featuredItems, trendingItems, featuredAccessories } = useAppSelector(
    (state) => state.homeItems,
  );

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useUserSectionFetchQuery({});

  const [fetchTrending, { data: trendingData, isLoading: trendingLoading }] =
    useLazyMainSectionFetchQuery();
  const [fetchFeatured, { data: featuredData, isLoading: featuredLoading }] =
    useLazyMainSectionFetchQuery();
  const [
    fetchFeaturedAccessories,
    { data: accessoriesData, isLoading: accessoriesLoading },
  ] = useLazyMainSectionFetchQuery();

  const refTrending = useFetchOnView({
    fetchFunction: fetchTrending,
    sectionName: "trending",
    threshold: 1,
    page: null,
    triggerOnce: true,
  });

  const refFeatured = useFetchOnView({
    fetchFunction: fetchFeatured,
    sectionName: "featured",
    threshold: 1,
    page: null,
    triggerOnce: true,
  });

  const refFeaturedAccessories = useFetchOnView({
    fetchFunction: fetchFeaturedAccessories,
    sectionName: "featuredAccessories",
    threshold: 1,
    page: null,
    triggerOnce: true,
  });

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (trendingData) {
      dispatch(setTrendingItems(trendingData));
    }
  }, [trendingData]);

  useEffect(() => {
    if (featuredData) {
      dispatch(setFeaturedItems(featuredData));
    }
  }, [featuredData]);

  useEffect(() => {
    if (accessoriesData) {
      dispatch(setFeaturedAccessories(accessoriesData));
    }
  }, [accessoriesData]);

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
    <>
      {searchValue.length <= 0 && (
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
            <img
              className="cursor-pointer rounded-2xl"
              src={Wallet}
              alt="Wallet"
            />
          </div>
          <ImageSection cardAssets={secondCardAssets} />

          {userError && (
            <div className="text-red-500">Error loading user data</div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
