import { useAppSelector } from "../../../../redux/hook";

const ShippingInformationSection = () => {
  const shippingAddresses = useAppSelector(
    (state) => state.profileSlice.shippingAddresses,
  );

  return (
    <div className="mt-5 flex h-[200px] w-full max-w-[955px] flex-wrap justify-between">
      {shippingAddresses && shippingAddresses.length > 0
        ? shippingAddresses.map((item, id) => (
            <>{item.state ? item.state : "No state"}</>
          ))
        : "You do not have a shipping address saved."}
    </div>
  );
};
export default ShippingInformationSection;
