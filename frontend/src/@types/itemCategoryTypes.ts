import { productProps } from "./userCardTypes";

export interface IRecentlyViewedItems {
  data: productProps[];
  title: string;
  description: string;
}
export interface IRecommendedItems extends IRecentlyViewedItems {}
