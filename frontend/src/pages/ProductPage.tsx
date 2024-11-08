import React from "react";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import { useParams } from "react-router-dom";

const FullProduct = () => {
  const { title } = useParams();

  return (
    <div>
      <BreadCrumbs />
      {title}
    </div>
  );
};

export default FullProduct;
