import React from "react";

import UserSection from "../components/Sections/UserSection/UserSection";
import MainSection from "../components/Sections/MainSection/MainSection";
import ImageSection from "../components/Sections/ImageSection/ImageSection";
import { useAppSelector } from "../redux/hook";

import { useFetchBrandSection } from "../hooks/useFetchBrandSection";

import { useFetchUserSection } from "../hooks/useFetchUserSection";
import { useFetchInstagramSection } from "../hooks/useFetchInstagramSection";
import InstagramSection from "../components/Sections/InstagramSection/InstagramSection";
import TopSlider from "../components/Slider/HomeSliders/FirstSlider/Slider";
import BottSlider from "../components/Slider/HomeSliders/SecondSlider/Slider";
import CardSection from "../components/Sections/CardSection/CardSection";
import { useFetchImageSection } from "../hooks/useFetchImageSection";
const Home: React.FC = () => {
  const {
    addidasItems,
    nikeItems,
    balenciagaItems,
    accessories,
    supremeItems,
    timberlandItems,
    rickOwensItems,
    controllersItems,
    popularImageItems,
    holidayImageItems,
    seasonalImageItems,
    browseImageItems,
  } = useAppSelector((state) => state.homeItems);
  const { recommendedItems, recentlyViewed, userError } = useFetchUserSection();
  const { ref: refAdiddas } = useFetchBrandSection("addidas");
  const { ref: refNike } = useFetchBrandSection("nike");
  const { ref: refBalenciaga } = useFetchBrandSection("balenciaga");
  const { ref: refAccessories } = useFetchBrandSection("accessories");
  const { ref: refSupreme } = useFetchBrandSection("supreme");
  const { ref: refTimberland } = useFetchBrandSection("timberland");
  const { ref: refRickOwens } = useFetchBrandSection("rickowens");
  const { ref: refControllers } = useFetchBrandSection("controllers");
  const { ref: refPopular } = useFetchImageSection("popular");
  const { ref: refHoliday } = useFetchImageSection("holiday");
  const { ref: refSeasonal } = useFetchImageSection("seasonal");
  const { ref: refBrowse } = useFetchImageSection("browse");
  const { ref: refInstagramSection } = useFetchInstagramSection("instagram");

  return (
    <div className="mt-6">
      <TopSlider />
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
      <div ref={refPopular}>
        <ImageSection
          cardAssets={popularImageItems.data}
          title={popularImageItems.title}
        />
      </div>
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
      <CardSection />
      <div ref={refBalenciaga}>
        <MainSection
          mainTitle={balenciagaItems.title}
          items={balenciagaItems.data}
          description={balenciagaItems.description}
        />
      </div>
      <div ref={refHoliday}>
        <ImageSection
          cardAssets={holidayImageItems.data}
          title={holidayImageItems.title}
        />
      </div>

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
      <div ref={refSeasonal}>
        <ImageSection
          cardAssets={seasonalImageItems.data}
          title={seasonalImageItems.title}
        />
      </div>
      <div ref={refInstagramSection}>
        <InstagramSection />
      </div>
      <div ref={refTimberland}>
        <MainSection
          mainTitle={timberlandItems.title}
          items={timberlandItems.data}
          description={timberlandItems.description}
        />
      </div>
      <BottSlider />
      <div ref={refRickOwens}>
        <MainSection
          mainTitle={rickOwensItems.title}
          items={rickOwensItems.data}
          description={rickOwensItems.description}
        />
      </div>
      <div ref={refBrowse}>
        <ImageSection
          cardAssets={browseImageItems.data}
          title={browseImageItems.title}
        />
      </div>
      <div ref={refControllers}>
        <MainSection
          mainTitle={controllersItems.title}
          items={controllersItems.data}
          description={controllersItems.description}
        />
      </div>
      {userError && <div className="text-red-500">Error loading user data</div>}
    </div>
  );
};

export default Home;
