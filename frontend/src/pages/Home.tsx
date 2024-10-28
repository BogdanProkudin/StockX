import React from "react";

import Slider from "../components/Slider/Slider";

import UserSection from "../components/Sections/UserSection/UserSection";
import MainSection from "../components/Sections/MainSection/MainSection";
import ImageSection from "../components/Sections/ImageSection/ImageSection";
import {
  useLazyMainSectionFetchQuery,
  useUserSectionFetchQuery,
} from "../redux/api/mainApiSlice";
import useFetchOnView from "../hooks/useFetchOnView";

const Home: React.FC = () => {
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useUserSectionFetchQuery({});

  const [fetchMainSection, { data: mainData, isLoading: mainLoading }] =
    useLazyMainSectionFetchQuery(); // это с rtk query эта функция отрабатывает не при монтирование компонента а когда
  // ты скажешь деструтуризацией вытаскиваеешь fetchMainSection блогадаря ему ты запускаешь функцию а далле как по дефолту

  const refTrending = useFetchOnView({
    fetchFunction: fetchMainSection,
    sectionName: "trending",
  });
  const refFeatured = useFetchOnView({
    fetchFunction: fetchMainSection,
    sectionName: "featured",
  });
  return (
    <div className="mt-6">
      <Slider />
      <UserSection
        mainTitle={userData ? userData.recentlyViewed.title : ""}
        items={userData ? userData.recentlyViewed.data : []}
        description={userData ? userData.recentlyViewed.description : ""}
        status={userLoading}
      />
      <UserSection
        mainTitle={userData ? userData.recommendedItems.title : ""}
        items={userData ? userData.recommendedItems.data : []}
        description={userData ? userData.recommendedItems.description : ""}
        status={userLoading}
      />

      <ImageSection />

      <div ref={refTrending}>
        <MainSection
          mainTitle={mainData ? mainData.title : ""} // mainData.trendingItems.title
          items={mainData ? mainData.data : []} //mainData.trendingItems.data
          description={mainData ? mainData.description : ""} //mainData.trendingItems.description
          status={mainLoading}
        />
      </div>

      <div ref={refFeatured}>
        <MainSection
          mainTitle={mainData ? mainData.title : ""} // mainData.featuredItems.title
          items={mainData ? mainData.data : []} //mainData.featuredItems.data
          description={mainData ? mainData.description : ""} //mainData.featuredItems.description
          status={mainLoading}
        />
      </div>
    </div>
  );
};

export default Home;
