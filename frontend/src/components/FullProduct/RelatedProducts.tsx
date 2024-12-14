import axios from "axios";
import React, { useEffect, useState } from "react";
import { FullProductProps } from "../../@types/userCardTypes";

interface RelatedProductsProps {
  brand: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ brand }) => {
  const [product, setProduct] = useState<FullProductProps[] | null>(null);
  useEffect(() => {
    const fetchFullProduct = async () => {
      try {
        const apiUrl = `https://api.sneakersapi.dev/api/v2/products?search=${brand}`;
        const { data } = await axios.get(apiUrl, {
          headers: { Authorization: "f-2895d084cba594772c79255a5fb658d0" },
        });
        setProduct(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFullProduct();
  }, []);
  return <div className="flex gap-2">{product?.map((el) => el.title)}</div>;
};

export default RelatedProducts;
