import React, { useEffect, useState } from "react";
import HeaderLogo from "../components/Header/Logo/HeaderLogo";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FullProductProps } from "../@types/userCardTypes";
import axios from "axios";

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
      <header className="border-b border-[#cfcfcf]">
        <div className="container">
          <div className="flex items-center justify-between py-8">
            <HeaderLogo />
            <span className="cursor-pointer text-xl text-[#008000]">FAQ</span>
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="flex h-[87vh] items-center justify-center">
          <LoaderCircle
            size={50}
            color={"#008000"}
            className="mb-28 animate-spin"
          />
        </div>
      ) : (
        <div className="flex h-[87vh] justify-between">
          <div className="ml-8 mt-8 h-[495px] w-[800px]">
            <button className="rounded-2xl border border-black px-5 py-2 font-bold text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
              <Link className="flex items-center gap-3" to={`/${title}`}>
                <ArrowLeft size={18} />
                Back
              </Link>
            </button>
            <h1 className="my-5 text-center text-xl font-bold">
              {product?.title}
            </h1>
            <img className="h-full" src={product?.image} alt="" />
          </div>
          <div className="h-full w-[570px] bg-[#f4f3f1] px-7 py-8">
            <h1>Select Size</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
