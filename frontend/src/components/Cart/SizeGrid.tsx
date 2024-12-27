import React from "react";

const SizeGrid = () => {
  const sizeOrder = ["US", "UK", "CM", "KR", "EU"];
  return (
    <div className="my-2 flex items-center gap-3">
      {sizeOrder.map((el, id) => (
        <button
          disabled={el !== "US"}
          className={`cursor-pointer rounded-full bg-black px-3 py-1 text-sm text-white disabled:cursor-not-allowed disabled:bg-[white] disabled:text-[#00000080]`}
          key={id}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default SizeGrid;
