import Jordan from "../images/1.webp";
import Supreme from "../images/2.webp";
import LouisVuitton from "../images/3.webp";
import FearsofGodEssentials from "../images/4.webp";
import UGG from "../images/5.webp";
import under100 from "../images/6.webp";
import under250 from "../images/7.webp";
import grail from "../images/8.webp";
import giftsman from "../images/9.webp";
import giftswoman from "../images/10.webp";
import Hoodies from "../images/12.webp";
import Jackets from "../images/13.webp";
import Handbags from "../images/14.webp";
import Watches from "../images/15.webp";
import Lego from "../images/16.webp";

export interface cardAssetsProps {
  img: string;
  path: string;
  alt: string;
}

export const firstCardAssets: cardAssetsProps[] = [
  { img: Jordan, path: "", alt: "Jordan" },
  { img: Supreme, path: "", alt: "Supreme" },
  { img: LouisVuitton, path: "", alt: "Louis Vuitton" },
  { img: UGG, path: "", alt: "UGG" },
  { img: FearsofGodEssentials, path: "", alt: "Fears Of God Essentials" },
];
export const secondCardAssets: cardAssetsProps[] = [
  { img: under100, path: "", alt: "Gifts Under 100" },
  { img: under250, path: "", alt: "Gifts Under 250" },
  { img: grail, path: "", alt: "Grail Gifts" },
  { img: giftsman, path: "", alt: "Gifts For Him" },
  { img: giftswoman, path: "", alt: "Gifts For Her" },
];
export const thirdCardAssets: cardAssetsProps[] = [
  { img: Hoodies, path: "", alt: "Hoodies" },
  { img: Jackets, path: "", alt: "Jackets" },
  { img: Handbags, path: "", alt: "HandBags" },
  { img: Watches, path: "", alt: "Watches" },
  { img: Lego, path: "", alt: "Lego" },
];
