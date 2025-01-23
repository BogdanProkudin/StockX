import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
interface ProductPreviewProps {
  image: string | undefined;
  title: string | undefined;
  isConfirm: string | null;
}
const ProductPreview: React.FC<ProductPreviewProps> = ({
  image,
  title,
  isConfirm,
}) => {
  return (
    <div className="relative ml-8 mt-8 flex w-full flex-col items-center">
      <Link className="" to={`/${title}`}>
        <button className="absolute left-0 flex items-center gap-3 rounded-2xl border border-black px-5 py-2 font-bold text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
          <ArrowLeft size={18} />
          Back
        </button>
      </Link>
      {!isConfirm && (
        <h1 className="my-5 mt-10 text-center text-xl font-bold">{title}</h1>
      )}
      <div className="flex h-4/5 items-center justify-center">
        <img className="h-[500px]" src={image} alt="" />
      </div>
    </div>
  );
};

export default ProductPreview;
