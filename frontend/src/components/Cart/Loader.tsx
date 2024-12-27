import { LoaderCircle } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex h-[87vh] items-center justify-center">
      <LoaderCircle
        size={50}
        color={"#008000"}
        className="mb-28 animate-spin"
      />
    </div>
  );
};

export default Loader;
