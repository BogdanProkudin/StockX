type ShippingItemProps = {
  firstName: string;
  lastName: string;
  address: string;
  country?: string;
  city: string;
  postalCode?: number;
  state: string;
  handleEditShippingAddress?: () => number;
};
const ShippingItem: React.FC<ShippingItemProps> = ({
  firstName,
  lastName,
  address,
  postalCode,
  state,
  city,
  handleEditShippingAddress,
}) => {
  return (
    <div className="flex h-[110px] w-[364px] flex-col bg-[#FAFAFA] p-[12px]">
      <div className="flex justify-between">
        <span className="text-[#242424]">{firstName + " " + lastName}</span>
        <span
          onClick={handleEditShippingAddress}
          className="cursor-pointer border-b-2 border-b-black"
        >
          Edit
        </span>
      </div>
      <div className="mt-3 text-[#5F5F5F]">{address}</div>
      <div>
        <span className="text-[#5F5F5F]">{`${state},${city},${postalCode}`}</span>
      </div>
    </div>
  );
};

export default ShippingItem;
