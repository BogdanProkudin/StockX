import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { variants } from "../FullProduct/SizePopUp";
import { useAppDispatch } from "../../redux/hook";
import { setCartPrice } from "../../redux/slices/cartSlice";
interface PriceBlockProps {
  variants: variants[] | undefined;
}
const PriceBlock: React.FC<PriceBlockProps> = ({ variants }) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const sizeQuery = searchParams.get("size");
  const price = variants?.find((el) => el.size === sizeQuery)?.price;

  useEffect(() => {
    dispatch(setCartPrice(Number(price)));
  }, [sizeQuery]);
  return (
    <div className="flex h-[110px] flex-col rounded-xl bg-white px-5 py-6">
      Buy Now: <br />
      <span className="text-3xl font-bold">€{price}</span>
    </div>
  );
};

export default PriceBlock;
