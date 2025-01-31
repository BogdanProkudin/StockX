import React, { useEffect, useRef } from "react";
import { variants } from "../FullProduct/SizePopUp";
import { X } from "lucide-react";
import { SizeVariants } from "../../utils/SizeVariants";
interface Imodal {
  id: string | undefined;
  variants: variants[];
  image: string;
  min_price: number;
  title: string;
  price: number;
  closeModal: () => void;
}
const FavoriteModal: React.FC<Imodal> = ({ closeModal, variants }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  useEffect(() => {
    const handleClose = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClose);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClose);
    };
  }, [closeModal]);
  const sizes = SizeVariants(variants);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="mb-32 max-w-[500px] rounded-3xl bg-white text-black shadow-lg"
      >
        <div className="flex items-center justify-between border-b border-[#a4a4a4] px-5 pb-2 pt-4">
          <h1 className="text-xl">Favorite Item</h1>
          <button className="cursor-pointer rounded-full p-1 transition-all duration-300 ease-in-out hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>
        <div className="px-5 py-4">
          <p className="font-[15px]">
            Keep track of items you love by selecting the heart. You can save
            them for later and follow their stats to make smart purchase
            decisions.
          </p>
          <span className="text-lg font-[540]">Size*</span>
          <div
            className="grid-cols-auto my-3 grid gap-2"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(45px, 1fr))",
            }}
          >
            {sizes.map((size, index) => (
              <button
                className="h-[40px] w-[45px] rounded-lg border border-[#a4a4a462] font-bold"
                key={index}
              >
                {size}
              </button>
            ))}
          </div>
          <span className="text-lg font-[540]">Add to list-</span>
        </div>
      </div>
    </div>
  );
};

export default FavoriteModal;
