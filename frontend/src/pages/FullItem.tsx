import React from "react";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import { useParams } from "react-router-dom";

const FullItem = () => {
  const { title } = useParams();

  return (
    <div>
      <BreadCrumbs />
      {title}
    </div>
  );
};

export default FullItem;
