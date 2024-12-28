import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { FullProductProps } from "../@types/userCardTypes";
import axios from "axios";
import SizeBlock from "../components/Cart/SizeBlock";
import ProductPreview from "../components/Cart/ProductPreview";
import HeaderCart from "../components/Cart/HeaderCart";
import Loader from "../components/Cart/Loader";
import SizeGrid from "../components/Cart/SizeGrid";

const Cart = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<FullProductProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
  return (
    <div>
      <HeaderCart />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex h-[87vh] justify-between">
          <ProductPreview image={product?.image} title={product?.title} />

          <div className="flex h-full w-[570px] flex-col bg-[#f4f3f1] pt-8">
            <div className="flex-1 px-7">
              <h1 className="mb-2 text-2xl font-bold">Select Size</h1>
              <SizeGrid />
              <SizeBlock variants={product?.variants} />
            </div>
            <div className="border-l border-t border-l-[#cfcfcf] border-t-[#cfcfcf] bg-white px-7 py-5">
              <button className="rounded-2xl border border-black px-5 py-2 font-bold text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
                <Link className="flex items-center gap-3" to={`/${title}`}>
                  Cancel
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
