import React, { useEffect } from "react";

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

const Home: React.FC = () => {
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
  });
  const refFeatured = useFetchOnView({
    fetchFunction: fetchMainSection,
    sectionName: "featured",
  });
  console.log(mainData);

  return (
    <div className="mt-6">
      {/* <FoundItems /> */}
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
          mainTitle={mainData ? mainData.trendingItems.title : ""} // mainData.trendingItems.title
          items={mainData ? mainData.trendingItems.data : []} //mainData.trendingItems.data
          description={mainData ? mainData.trendingItems.description : ""} //mainData.trendingItems.description
          status={mainLoading}
        />
      </div>

      <div ref={refFeatured}>
        <MainSection
          mainTitle={mainData ? mainData.featuredItems.title : ""} // mainData.featuredItems.title
          items={mainData ? mainData.featuredItems.data : []} //mainData.featuredItems.data
          description={mainData ? mainData.featuredItems.description : ""} //mainData.featuredItems.description
          status={mainLoading}
        />
      </div>
    </div>
  );
};

export default Home;
