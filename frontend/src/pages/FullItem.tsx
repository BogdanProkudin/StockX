import React from "react";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import { useParams } from "react-router-dom";

const FullItem = () => {
  const { title } = useParams();
  console.log(title);

  return (
    <div>
      <BreadCrumbs />
      {title}
    </div>
  );
};

export default FullItem;
