import React, { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { FullProductProps } from "../@types/userCardTypes";
import axios from "axios";
import SizeBlock from "../components/Cart/SizeBlock";
import ProductPreview from "../components/Cart/ProductPreview";
import HeaderCart from "../components/Cart/HeaderCart";
import Loader from "../components/Cart/Loader";
import SizeGrid from "../components/Cart/SizeGrid";
import { ArrowRight, Car } from "lucide-react";
import EditSize from "../components/Cart/EditSize";
import PriceBlock from "../components/Cart/PriceBlock";
import TotalPrice from "../components/Cart/TotalPrice";
import MakeOffer from "../components/Cart/MakeOffer";

const Cart = () => {
  const { title } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<FullProductProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMakeOffer, setIsMakeOffer] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchFullProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        document.body.style.overflow = "hidden";
        const apiUrl = `https://api.sneakersapi.dev/api/v2/products?search=${title}`;
        const { data } = await axios.get(apiUrl, {
          headers: { Authorization: "f-2895d084cba594772c79255a5fb658d0" },
        });
        setProduct(data.data[0]);
        console.log(data.data[0]);
      } catch (error) {
        console.error(error);
        setError("Info failed try again");
      } finally {
        document.body.style.overflow = "auto";
        setIsLoading(false);
      }
    };

    fetchFullProduct();
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/not-found", { replace: true });
    }
  }, [error, navigate]);
  const sizeQuery = searchParams.get("size");
  const sizeOrder = ["US", "UK", "CM", "KR", "EU"];
  const price = Math.round(Number(product?.avg_price));
  const onClickMakeOffer = () => {
    setIsMakeOffer(true);
  };
  return (
    <div>
      <HeaderCart />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex h-[87vh] justify-between">
          <ProductPreview image={product?.image} title={product?.title} />

          <div className="flex h-full min-w-[600px] flex-col bg-[#f4f3f1] pt-8">
            <div className="flex-1 px-7">
              {sizeQuery ? (
                <div className="flex flex-col gap-5">
                  <h1 className="mb-3 text-center text-lg font-bold">
                    {isMakeOffer ? "Make An Offer" : "Buy Now"}
                  </h1>
                  <EditSize gender={product?.gender} sizeOrder={sizeOrder[0]} />
                  {!isMakeOffer && <PriceBlock price={price} />}

                  {!isMakeOffer && (
                    <button
                      onClick={onClickMakeOffer}
                      className="flex items-center justify-between rounded-xl bg-white px-5 py-5"
                    >
                      <div>
                        <h4 className="w-[110px] font-semibold">
                          Make An Offer
                        </h4>
                        <span>
                          Get it for less if a seller accepts your price
                        </span>
                      </div>
                      <span className="rounded-full border border-black p-1">
                        <ArrowRight size={20} />
                      </span>
                    </button>
                  )}
                  {!isMakeOffer && (
                    <div className="flex items-center gap-5 rounded-xl bg-white px-5 py-5">
                      <Car />
                      <span>Standard Shipping</span>
                    </div>
                  )}
                  {isMakeOffer && <MakeOffer price={price} />}
                </div>
              ) : (
                <>
                  <h1 className="mb-2 text-2xl font-bold">Select Size</h1>
                  <SizeGrid sizeOrder={sizeOrder} />
                  <SizeBlock variants={product?.variants} />
                </>
              )}
            </div>
            {sizeQuery ? (
              <TotalPrice price={price} />
            ) : (
              <div className="border-l border-t border-l-[#cfcfcf] border-t-[#cfcfcf] bg-white px-7 py-5">
                <button className="rounded-2xl border border-black px-5 py-2 font-bold text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
                  <Link className="flex items-center gap-3" to={`/${title}`}>
                    Cancel
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
