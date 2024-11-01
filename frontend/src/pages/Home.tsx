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
  const [data1, setData1] = useState<any>();
  const [data2, setData2] = useState<any>();
  if (mainData?.trendingItems) {
    setData1(mainData.trendingItems);
  }
  if (mainData?.featuredItems) {
    setData2(mainData.featuredItems);
  }
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
          mainTitle={data1 ? data1.title : ""} // mainData.trendingItems.title
          items={data1 ? data1.data : []} //mainData.trendingItems.data
          description={data1 ? data1.description : ""} //mainData.trendingItems.description
          status={mainLoading}
        />
      </div>

      <div ref={refFeatured}>
        <MainSection
          mainTitle={mainData ? data2.title : ""} // mainData.featuredItems.title
          items={mainData ? data2.data : []} //mainData.featuredItems.data
          description={mainData ? data2.description : ""} //mainData.featuredItems.description
          status={mainLoading}
        />
      </div>
    </div>
  );
};

export default Home;
