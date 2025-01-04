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
import { useAppDispatch } from "../redux/hook";
import { setCartPrice } from "../redux/slices/cartSlice";
import ShipForm from "../components/Cart/ShipForm";
import ApprovePurchase from "../components/Cart/ApprovePurchase";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { title } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<FullProductProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMakeOffer, setIsMakeOffer] = useState(false);
  const [shipping, setShipping] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchFullProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        document.body.style.overflow = "hidden";
        const apiUrl = `https://api.sneakersapi.dev/api/v2/products?search=${title}`;
        const { data } = await axios.get(apiUrl, {
          headers: { Authorization: import.meta.env.VITE_API_KEY },
        });
        setProduct(data.data[0]);
        dispatch(setCartPrice(Math.round(Number(data.data[0].avg_price))));
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
  const isBid = searchParams.get("isBid");
  const isConfirm = searchParams.get("isConfirm");

  const sizeOrder = ["US", "UK", "CM", "KR", "EU"];

  const onClickMakeOffer = () => {
    setIsMakeOffer(true);
  };
  return (
    <div>
      <HeaderCart />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex h-full min-h-[87vh] justify-between">
          <ProductPreview
            isConfirm={isConfirm}
            image={product?.image}
            title={product?.title}
          />

          <div className="flex h-full min-h-[87vh] min-w-[600px] flex-col bg-[#f4f3f1] pt-8">
            {isConfirm ? (
              <ApprovePurchase title={product?.title} size={sizeQuery} />
            ) : (
              <>
                {shipping ? (
                  <div className="px-7">
                    <ShipForm setShipping={() => setShipping(false)} />
                  </div>
                ) : (
                  <>
                    <div className="flex-1 px-7">
                      {sizeQuery ? (
                        <div className="flex h-[450px] flex-col gap-5">
                          <h1 className="mb-3 text-center text-lg font-bold">
                            {isMakeOffer || isBid ? "Make An Offer" : "Buy Now"}
                          </h1>
                          <EditSize
                            gender={product?.gender}
                            sizeOrder={sizeOrder[0]}
                          />
                          {!isMakeOffer && !isBid && (
                            <PriceBlock variants={product?.variants} />
                          )}

                          {!isMakeOffer && !isBid && (
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
                          {(isMakeOffer || isBid) && (
                            <MakeOffer variants={product?.variants} />
                          )}

                          <div className="flex items-center justify-between rounded-xl bg-white px-5 py-3">
                            <div className="flex items-center gap-5">
                              <Car />
                              <p>
                                Standard Shipping <br />
                                <span className="text-sm text-[#969696]">
                                  Typically arrives within 14 days
                                </span>
                              </p>
                            </div>
                            <span
                              onClick={() => setShipping(true)}
                              className="cursor-pointer text-sm font-bold text-[#006340]"
                            >
                              Add
                            </span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h1 className="mb-2 text-2xl font-bold">
                            Select Size
                          </h1>
                          <SizeGrid sizeOrder={sizeOrder} />
                          <SizeBlock variants={product?.variants} />
                        </>
                      )}
                    </div>
                    {sizeQuery ? (
                      <TotalPrice setShipping={() => setShipping(true)} />
                    ) : (
                      <div className="border-l border-t border-l-[#cfcfcf] border-t-[#cfcfcf] bg-white px-7 py-5">
                        <button className="rounded-2xl border border-black px-5 py-2 font-bold text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
                          <Link
                            className="flex items-center gap-3"
                            to={`/${title}`}
                          >
                            Cancel
                          </Link>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
