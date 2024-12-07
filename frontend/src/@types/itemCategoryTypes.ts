import { userCardProps } from "./userCardTypes";

export interface IRecentlyViewedItems {
  data: userCardProps[];
  title: string;
  description: string;
}
export interface IRecommendedItems extends IRecentlyViewedItems {}
