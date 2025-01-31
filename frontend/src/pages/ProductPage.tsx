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
import { OutletProductPageProps } from "../@types/userCardTypes";
import Skeleton from "../components/BreadCrumbs/Skeleton";
import SubTitleSkeleton from "../components/FullProduct/Skeletons/SubTitleSkeleton";
import TitleSkeleton from "../components/Sections/TitleSkeleton";
import { Rocket } from "lucide-react";
import { imageNotFound } from "../assets/images/imageNotFound";
import SellBlock from "../components/FullProduct/SellBlock";
import InfoBlockSkeleton from "../components/FullProduct/Skeletons/InfoBlockSkeleton";
import SizeSkeleton from "../components/FullProduct/Skeletons/SizeSkeleton";

const FullProduct = () => {
  const { product, isLoading } = useOutletContext<OutletProductPageProps>(); //это данные с лайаута
  const [sellVisible, setSellVisible] = useState(false);
  const [sellPrice, setSellPrice] = useState(0);

  const [soldItems, setSoldItems] = useState(0);
  const [isPrice, setIsPrice] = useState<number | null>(null);

  return (
    <div className="w-[1120px]">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {product && product.category && (
            <BreadCrumbs
              brand={product.brand}
              title={product.title}
              category={product.category}
              slug={product.slug}
            />
          )}
        </>
      )}

      <div className="border-{#a4a4a4} mb-4 flex gap-2 border-b pb-5">
        <div className="w-[636px]">
          <h1 className="text-3xl font-bold">
            {isLoading ? <TitleSkeleton /> : product?.brand}
          </h1>
          <h3 className="text-sm opacity-70">
            {isLoading ? <SubTitleSkeleton /> : product?.title}
          </h3>
          <div className="flex justify-center">
            {isLoading ? (
              <img
                src={imageNotFound}
                className="mt-2 h-[404px] w-[506px]"
                alt=""
              />
            ) : (
              <img
                className="mt-2 h-[404px] w-[486px]"
                src={product?.image}
                alt={product?.title}
              />
            )}
          </div>
        </div>
        <div className="flex w-[480px] flex-col gap-2">
          <div className="flex items-center gap-2">
            <Rocket size={16} />
            <p className="text-sm">
              <span className="font-bold">Xpress Ship </span>
              3-day shipping available in select sizes
            </p>
          </div>
          {isLoading ? (
            <SizeSkeleton />
          ) : (
            product?.variants.find((el) => el.size.length > 1) && (
              <SizePopUp
                sellVisible={sellVisible}
                price={product.avg_price}
                variants={product.variants}
                setIsPrice={setIsPrice}
              />
            )
          )}
          {sellVisible ? (
            <SellBlock title={product?.title} sellPrice={sellPrice} />
          ) : (
            <PriceBlock
              id={product?.id}
              title={product?.title}
              price={product?.avg_price}
              max_price={product?.max_price}
              min_price={product?.min_price}
              isPrice={isPrice}
              loading={isLoading}
              setSoldItems={setSoldItems}
            />
          )}

          {product ? (
            <InfoBlock
              sellVisible={sellVisible}
              price={product.avg_price}
              setSellVisible={setSellVisible}
              setSellPrice={setSellPrice}
            />
          ) : (
            <InfoBlockSkeleton />
          )}
        </div>
      </div>
      {product && (
        <RelatedProducts title={product.title} brand={product.brand} />
      )}
      {product && (
        <DescriptionBlock
          description={product.description}
          gender={product.gender}
          color={product.color}
          sku={product.sku}
          date={product.release_dates}
        />
      )}
      {product && <ReviewBlock />}
      {product && (
        <MonthHistoricalBlock
          averagePrice={product.avg_price}
          max={product.max_price}
          min={product.min_price}
          soldItems={soldItems}
        />
      )}
    </div>
  );
};

export default FullProduct;
