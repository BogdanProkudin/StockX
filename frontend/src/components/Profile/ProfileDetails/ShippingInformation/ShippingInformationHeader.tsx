import { useNavigate } from "react-router-dom";

const ShippingHeader = () => {
  const navigate = useNavigate();
  const handleAddShippingAddress = () => {
    navigate("/settings/shipping");
  };
  return (
    <div className="flex w-full items-center justify-between border-b-2 border-E2E8F0 pb-2 pt-4">
      <h1 className="text-xl font-bold text-[#242424]">Shipping Information</h1>
      <button
        onClick={handleAddShippingAddress}
        className="border-brand-secondary text-brand-secondary relative inline-flex h-[36px] min-w-[auto] select-none appearance-none items-center justify-center whitespace-nowrap rounded-full border bg-transparent px-4 py-4 align-middle text-sm font-semibold normal-case leading-[1.25] outline-[2px] outline-offset-2 outline-transparent transition duration-150 hover:bg-black hover:text-white"
      >
        Add
      </button>
    </div>
  );
};

export default ShippingHeader;
