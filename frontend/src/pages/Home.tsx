import React, { useEffect } from "react";
import Slider from "../components/Slider/Slider";
import UserSection from "../components/Sections/UserSection/UserSection";
import MainSection from "../components/Sections/MainSection/MainSection";
import ImageSection from "../components/Sections/ImageSection/ImageSection";
import { useAppSelector } from "../redux/hook";
import Apparel from "../assets/images/HolidayCampaign_XpressShipApparel_Evergreen_SecondaryA.webp";
import Wallet from "../assets/images/Wallets-Card_Holders-Banners-ENSecondaryB.webp";
import {
  firstCardAssets,
  secondCardAssets,
  thirdCardAssets,
} from "../assets/ImgSection/ImgSection";
import { useFetchBrandSection } from "../hooks/useFetchBrandSection";

import { useFetchUserSection } from "../hooks/useFetchUserSection";

const Home: React.FC = () => {
  const { addidasItems, nikeItems, balenciagaItems } = useAppSelector(
    (state) => state.homeItems,
  );
  const { recommendedItems, recentlyViewed, userError, userLoading } =
    useFetchUserSection();
  const { ref: refAdiddas } = useFetchBrandSection("addidas");
  const { ref: refNike } = useFetchBrandSection("nike");
  const { ref: refBalenciaga } = useFetchBrandSection("balenciaga");

  return (
    <div className="mt-6">
      <Slider />
      <UserSection
        mainTitle={recentlyViewed.title}
        items={recentlyViewed.data}
        description={recentlyViewed.description}
        isLoading={userLoading}
      />
      <UserSection
        mainTitle={recommendedItems.title}
        items={recommendedItems.data}
        description={recommendedItems.description}
        isLoading={userLoading}
      />

      <ImageSection cardAssets={firstCardAssets} />

      <div ref={refAdiddas}>
        <MainSection
          mainTitle={addidasItems.title}
          items={addidasItems.data}
          description={addidasItems.description}
        />
      </div>

      <div ref={refNike}>
        <MainSection
          mainTitle={nikeItems.title}
          items={nikeItems.data}
          description={nikeItems.description}
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
        />
      </div>
      <ImageSection cardAssets={secondCardAssets} />
      <ImageSection cardAssets={thirdCardAssets} />
      {userError && <div className="text-red-500">Error loading user data</div>}
    </div>
  );
};

export default Home;
