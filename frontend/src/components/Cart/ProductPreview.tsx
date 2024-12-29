import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
interface ProductPreviewProps {
  image: string | undefined;
  title: string | undefined;
}
const ProductPreview: React.FC<ProductPreviewProps> = ({ image, title }) => {
  return (
    <div className="relative ml-8 mt-8 flex h-[495px] w-full flex-col items-center">
      <button className="absolute left-0 rounded-2xl border border-black px-5 py-2 font-bold text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
        <Link className="flex items-center gap-3" to={`/${title}`}>
          <ArrowLeft size={18} />
          Back
        </Link>
      </button>
      <h1 className="my-5 text-center text-xl font-bold">{title}</h1>
      <img className="h-full" src={image} alt="" />
    </div>
  );
};

export default ProductPreview;
