import { useEffect, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { userCardProps } from "../@types/userCardTypes";
import { Rocket } from "lucide-react";
import PriceBlock from "../components/FullProduct/PriceBlock";
import SizePopUp from "../components/FullProduct/SizePopUp";

const FullProduct = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<userCardProps | null>(null);
  const [isPrice, setIsPrice] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchFullProduct() {
      const res = await axios.get(
        `https://api.sneakersapi.dev/search?query=${slug}`,
      );
      const data = res.data.hits[0];

      setProduct(data);
      console.log(data);
    }
    fetchFullProduct();
  }, []);
  return (
    <div className="w-[1120px]">
      {product && (
        <>
          <BreadCrumbs
            label={product.labels}
            brand={product.brand}
            title={product.title}
            slug={product.slug}
          />
          <div className="flex gap-2">
            <div className="w-[636px]">
              <h1 className="text-3xl font-bold">{product.brand}</h1>
              <h3 className="text-sm opacity-70">{product.title}</h3>
              <div className="flex justify-center">
                <img
                  className="mt-2 h-[404px] w-[546px]"
                  src={product.image}
                  alt={product.title}
                />
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
              {product.variants.find((el) => el.size.length > 1) && (
                <SizePopUp
                  price={product.base_price}
                  size_system={product.size_system}
                  variants={product.variants}
                  setIsPrice={setIsPrice}
                />
              )}
              <PriceBlock
                price={product.base_price}
                max_price={product.max_price}
                min_price={product.min_price}
                isPrice={isPrice}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FullProduct;
