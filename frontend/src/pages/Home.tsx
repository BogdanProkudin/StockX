import React from "react";
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
import { useFetchInstagramSection } from "../hooks/useFetchInstagramSection";
import InstagramSection from "../components/Sections/InstagramSection/InstagramSection";

const Home: React.FC = () => {
  const {
    addidasItems,
    nikeItems,
    balenciagaItems,
    accessories,
    supremeItems,
  } = useAppSelector((state) => state.homeItems);
  const { recommendedItems, recentlyViewed, userError } = useFetchUserSection();
  const { ref: refAdiddas } = useFetchBrandSection("addidas");
  const { ref: refNike } = useFetchBrandSection("nike");
  const { ref: refBalenciaga } = useFetchBrandSection("balenciaga");
  const { ref: refAccessories } = useFetchBrandSection("accessories");
  const { ref: refSupreme } = useFetchBrandSection("supreme");
  const { ref: refInstagramSection } = useFetchInstagramSection("instagram");
  return (
    <div className="mt-6">
      <Slider />
      <UserSection
        mainTitle={recentlyViewed.title}
        items={recentlyViewed.data}
        description={recentlyViewed.description}
      />
      <UserSection
        mainTitle={recommendedItems.title}
        items={recommendedItems.data}
        description={recommendedItems.description}
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
      <div className="mb-28" ref={refAccessories}>
        <MainSection
          mainTitle={accessories.title}
          items={accessories.data}
          description={accessories.description}
        />
      </div>
      <div ref={refSupreme}>
        <MainSection
          mainTitle={supremeItems.title}
          items={supremeItems.data}
          description={supremeItems.description}
        />
      </div>
      <ImageSection cardAssets={thirdCardAssets} />
      <div ref={refInstagramSection}>
        <InstagramSection />
      </div>
      {userError && <div className="text-red-500">Error loading user data</div>}
    </div>
  );
};

export default Home;
