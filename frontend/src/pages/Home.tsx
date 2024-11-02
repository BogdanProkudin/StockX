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
import { useAppSelector } from "../redux/hook";

const Home: React.FC = () => {
  const searchInputValue = useAppSelector(
    (state) => state.searchSlice.searchValue,
  );

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
    page: null,
    threshold: 0,
    triggerOnce: true,
  });
  const refFeatured = useFetchOnView({
    fetchFunction: fetchMainSection,
    sectionName: "featured",
    page: null,
    threshold: 0,
    triggerOnce: true,
  });

  const [data1, setData1] = useState<any>();
  const [data2, setData2] = useState<any>();

  useEffect(() => {
    if (mainData && mainData.title === "Trending Sneakers") {
      setData1(mainData);
    }
    if (mainData && mainData.title === "Featured Apparel") {
      setData2(mainData);
    }
  }, [mainData]);

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

  const trendingItems = mainData?.trendingItems || {
    title: "",
    data: [],
    description: "",
  };
  const featuredItems = mainData?.featuredItems || {
    title: "",
    data: [],
    description: "",
  };

  if (searchInputValue.length > 0) {
    return (
      <div className="mt-6 flex items-center justify-center">
        <FoundItems />
      </div>
    );
  }

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

      <ImageSection />

      <div ref={refTrending}>
        <MainSection
          mainTitle={data1 ? data1.title : ""} // mainData.trendingItems.title
          items={data1 ? data1.data : []} //mainData.trendingItems.data
          description={data1 ? data1.description : ""} //mainData.trendingItems.description -->
          status={mainLoading}
        />
      </div>

      <div ref={refFeatured}>
        <MainSection
          mainTitle={data2 ? data2.title : ""} // data2.featuredItems.title
          items={data2 ? data2.data : []} //data2.featuredItems.data
          description={data2 ? data2.description : ""} //mainData.featuredItems.description -->
          status={mainLoading}
        />
      </div>

      {userError && <div className="text-red-500">Error loading user data</div>}
    </div>
  );
};

export default Home;
