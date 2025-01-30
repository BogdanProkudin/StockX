import React, { useEffect, useRef } from "react";
import { variants } from "../FullProduct/SizePopUp";
import { X } from "lucide-react";

interface Imodal {
  id: string;
  variants: variants[];
  image: string;
  title: string;
  price: number;
  closeModal: () => void;
}
const FavoriteModal: React.FC<Imodal> = ({ closeModal }) => {
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="mb-32 h-[360px] w-[500px] rounded-3xl bg-white text-black shadow-lg"
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
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteModal;
