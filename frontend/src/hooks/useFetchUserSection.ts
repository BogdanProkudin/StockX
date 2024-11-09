import { useEffect, useState } from "react";
import { useUserSectionFetchQuery } from "../redux/api/mainApiSlice";
import {
  IRecentlyViewedItems,
  IRecommendedItems,
} from "../@types/itemCategoryTypes";

export const useFetchUserSection = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<IRecentlyViewedItems>({
    data: [],
    title: "",
    description: "",
  });
  const [recommendedItems, setRecommendedItems] = useState<IRecommendedItems>({
    data: [],
    title: "",
    description: "",
  });
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useUserSectionFetchQuery({});
  useEffect(() => {
    if (userData) {
      if (userData.recentlyViewed) {
        setRecentlyViewed(userData.recentlyViewed);
      }
      if (userData.recommendedItems) {
        setRecommendedItems(userData.recommendedItems);
      }
    }
  }, [userData]);
  return { recentlyViewed, recommendedItems, userError, userLoading };
};
