import Jordan from "../images/1.webp";
import Supreme from "../images/2.webp";
import LouisVuitton from "../images/3.webp";
import FearsofGodEssentials from "../images/4.webp";
import UGG from "../images/5.webp";

export interface cardAssetsProps {
  img: string;
  path: string;
  alt: string;
}

export const cardAssets: cardAssetsProps[] = [
  { img: Jordan, path: "", alt: "Jordan" },
  { img: Supreme, path: "", alt: "Supreme" },
  { img: LouisVuitton, path: "", alt: "Louis Vuitton" },
  { img: UGG, path: "", alt: "UGG" },
  { img: FearsofGodEssentials, path: "", alt: "Fears Of God Essentials" },
];
