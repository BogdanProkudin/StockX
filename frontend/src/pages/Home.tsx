import React, { useEffect } from "react";
import Slider from "../components/Slider/Slider";

import UserSection from "../components/Sections/UserSection/UserSection";
import MainSection from "../components/Sections/MainSection/MainSection";
import ImageSection from "../components/Sections/ImageSection/ImageSection";
import { useUserSectionFetchQuery } from "../redux/api/mainApiSlice";

import { useAppSelector } from "../redux/hook";

import Apparel from "../assets/images/HolidayCampaign_XpressShipApparel_Evergreen_SecondaryA.webp";
import Wallet from "../assets/images/Wallets-Card_Holders-Banners-ENSecondaryB.webp";

import {
  firstCardAssets,
  secondCardAssets,
  thirdCardAssets,
} from "../assets/ImgSection/ImgSection";
import { useFetchHomePage } from "../hooks/useFetchHomePage";
const Home: React.FC = () => {
  const { addidasItems, nikeItems, balenciagaItems } = useAppSelector(
    (state) => state.homeItems,
  );

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useUserSectionFetchQuery({});

  // Используем для секций
  const { ref: refAdiddas } = useFetchHomePage("addidas");
  const { ref: refNike } = useFetchHomePage("nike");
  const { ref: refBalenciaga } = useFetchHomePage("balenciaga");

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

      <div ref={refAdiddas}>
        <MainSection
          mainTitle={addidasItems.title}
          items={addidasItems.data}
          description={addidasItems.description}
          status={false}
        />
      </div>

      <div ref={refNike}>
        <MainSection
          mainTitle={nikeItems.title}
          items={nikeItems.data}
          description={nikeItems.description}
          status={false}
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
      <div ref={refBalenciaga}>
        <MainSection
          mainTitle={balenciagaItems.title}
          items={balenciagaItems.data}
          description={balenciagaItems.description}
          status={false}
        />
      </div>
      <ImageSection cardAssets={secondCardAssets} />
      <ImageSection cardAssets={thirdCardAssets} />
      {userError && <div className="text-red-500">Error loading user data</div>}
    </div>
  );
};

export default Home;
