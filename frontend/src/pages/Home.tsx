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
  setAddidasItems,
  setNikeItems,
  setBalenciagaItems,
} from "../redux/slices/homeItemsSlice";
import Apparel from "../assets/images/HolidayCampaign_XpressShipApparel_Evergreen_SecondaryA.webp";
import Wallet from "../assets/images/Wallets-Card_Holders-Banners-ENSecondaryB.webp";

import {
  firstCardAssets,
  secondCardAssets,
  thirdCardAssets,
} from "../assets/ImgSection/ImgSection";
const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { addidasItems, nikeItems, balenciagaItems } = useAppSelector(
    (state) => state.homeItems,
  );

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useUserSectionFetchQuery({});

  const [fetchAddidas, { data: addidasData, isLoading: trendingLoading }] =
    useLazyMainSectionFetchQuery();
  const [fetchNike, { data: nikeData, isLoading: featuredLoading }] =
    useLazyMainSectionFetchQuery();
  const [
    fetchBalenciaga,
    { data: balenciagaData, isLoading: accessoriesLoading },
  ] = useLazyMainSectionFetchQuery();

  const refAdiddas = useFetchOnView({
    fetchFunction: fetchAddidas,
    sectionName: "addidas",
    threshold: 0.2,
    page: null,
    triggerOnce: true,
  });

  const refNike = useFetchOnView({
    fetchFunction: fetchNike,
    sectionName: "nike",
    threshold: 0.2,
    page: null,
    triggerOnce: true,
  });

  const refBalenciaga = useFetchOnView({
    fetchFunction: fetchBalenciaga,
    sectionName: "balenciaga",
    threshold: 0.2,
    page: null,
    triggerOnce: true,
  });

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (addidasData) {
      dispatch(setAddidasItems(addidasData));
    }
  }, [addidasData]);

  useEffect(() => {
    if (nikeData) {
      dispatch(setNikeItems(nikeData));
    }
  }, [nikeData]);

  useEffect(() => {
    if (balenciagaData) {
      dispatch(setBalenciagaItems(balenciagaData));
    }
  }, [balenciagaData]);

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

      <div ref={refAdiddas}>
        <MainSection
          mainTitle={addidasItems.title}
          items={addidasItems.data}
          description={addidasItems.description}
          status={trendingLoading}
        />
      </div>

      <div ref={refNike}>
        <MainSection
          mainTitle={nikeItems.title}
          items={nikeItems.data}
          description={nikeItems.description}
          status={featuredLoading}
        />
      </div>

      <div className="mb-10 flex gap-5">
        <img
          className="cursor-pointer rounded-2xl"
          src={Apparel}
          alt="Apparel"
        />
        <img className="cursor-pointer rounded-2xl" src={Wallet} alt="Wallet" />
      </div>
      <div ref={refBalenciaga}>
        <MainSection
          mainTitle={balenciagaItems.title}
          items={balenciagaItems.data}
          description={balenciagaItems.description}
          status={accessoriesLoading}
        />
      </div>
      <ImageSection cardAssets={secondCardAssets} />
      <ImageSection cardAssets={thirdCardAssets} />
      {userError && <div className="text-red-500">Error loading user data</div>}
    </div>
  );
};

export default Home;
