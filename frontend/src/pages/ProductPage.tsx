import { useOutletContext } from "react-router-dom";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import PriceBlock from "../components/FullProduct/PriceBlock";
import SizePopUp from "../components/FullProduct/SizePopUp";
import InfoBlock from "../components/FullProduct/InfoBlock";
import RelatedProducts from "../components/FullProduct/RelatedProducts";
import DescriptionBlock from "../components/FullProduct/DescriptionBlock";
import ReviewBlock from "../components/FullProduct/ReviewBlock";
import MonthHistoricalBlock from "../components/FullProduct/MonthHistoricalBlock";
import { useState } from "react";
import { FullProductProps } from "../@types/userCardTypes";

const FullProduct = () => {
  const product = useOutletContext<FullProductProps>(); // это данные с лайаута
  const [sellVisible, setSellVisible] = useState(false);
  const [sellPrice, setSellPrice] = useState(0);
  const [soldItems, setSoldItems] = useState(0);
  const [isPrice, setIsPrice] = useState<number | null>(null);
  return (
    <div className="w-[1120px]">
      <BreadCrumbs
        title={product.title}
        brand={product.brand}
        category={product.category}
        slug={product.slug}
      />

      <div className="border-{#a4a4a4} mb-4 flex gap-2 border-b pb-5">
        <div className="w-[636px]">
          <h1 className="text-3xl font-bold">{product.brand}</h1>
          <h3 className="text-sm opacity-70">{product.title}</h3>
          <div className="flex justify-center">
            <img
              className="mt-2 h-[404px] w-[486px]"
              src={product.image}
              alt={product.title}
            />
          </div>
        </div>
        <div className="flex w-[480px] flex-col gap-2">
          <SizePopUp
            price={product.avg_price}
            variants={product.variants}
            setIsPrice={setIsPrice} // Укажите реальную логику
          />
          <PriceBlock
            id={product.id}
            title={product.title}
            price={product.avg_price}
            max_price={product.max_price}
            min_price={product.min_price}
            setSoldItems={setSoldItems}
            isPrice={isPrice}
            loading={false}
          />
          <InfoBlock
            price={product.avg_price}
            sellVisible={sellVisible}
            setSellVisible={setSellVisible}
            setSellPrice={setSellPrice}
          />
        </div>
      </div>
      <RelatedProducts title={product.title} brand={product.brand} />
      <DescriptionBlock
        description={product.description}
        gender={product.gender}
        color={product.color}
        sku={product.sku}
        date={product.release_dates}
      />
      <ReviewBlock />
      <MonthHistoricalBlock
        averagePrice={product.avg_price}
        max={product.max_price}
        min={product.min_price}
        soldItems={soldItems}
      />
    </div>
  );
};

export default FullProduct;
