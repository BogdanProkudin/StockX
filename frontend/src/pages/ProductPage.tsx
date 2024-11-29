import React, { useEffect, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { userCardProps } from "../@types/userCardTypes";

const FullProduct = () => {
  const { title } = useParams();
  const [product, setProduct] = useState<userCardProps | null>(null);
  useEffect(() => {
    async function fetchFullProduct() {
      console.log(title);

      const res = await axios.get(
        `https://api.sneakersapi.dev/search?query=${title}`,
      );
      const data = res.data.hits.find((el) => el.title === title);

      setProduct(data);
    }
    fetchFullProduct();
  }, []);
  return (
    <div className="h-[100vh]">
      {product && (
        <>
          <BreadCrumbs />
          <div>{product.title}</div>
        </>
      )}
    </div>
  );
};

export default FullProduct;
