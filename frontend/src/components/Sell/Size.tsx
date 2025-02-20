import React from "react";
import { useSearchParams } from "react-router-dom";

interface SizeProps {
  gender: string | undefined;
  sizeOrder: string;
}
const EditSize: React.FC<SizeProps> = ({ gender, sizeOrder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sizeQuery = searchParams.get("size");
  const genderSep = gender
    ? gender.charAt(0).toUpperCase() + gender.slice(1)
    : "";
  const onClickEditSize = () => {
    const updatedsearchParams = new URLSearchParams(searchParams);
    updatedsearchParams.delete("size");
    setSearchParams(updatedsearchParams, { replace: true });
  };
  return (
    <button
      onClick={onClickEditSize}
      className="flex w-full justify-between rounded-xl bg-white px-4 py-5"
    >
      <div>
        Size:
        <span className="font-semibold">
          {" "}
          {sizeOrder + " " + genderSep + " " + sizeQuery}
        </span>
      </div>
      <span className="text-sm font-semibold text-[#006340]">Edit</span>
    </button>
  );
};

export default EditSize;
