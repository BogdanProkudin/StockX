import { log } from "node:console";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import ShippingItem from "./ShippingInformationItem";
import { setSelectedEditShippingAddress } from "../../../../redux/slices/profileSlice";
import { useNavigate } from "react-router-dom";

const ShippingInformationSection = () => {
  const shippingAddresses = useAppSelector(
    (state) => state.profileSlice.shippingAddresses,
  );
  const dispatch = useAppDispatch();
  console.log("shipping", shippingAddresses);
  const navigate = useNavigate();
  const handleEditShippingAddress = (id: number) => {
    navigate("/settings/shipping");
    localStorage.setItem("editShipping", JSON.stringify(shippingAddresses[id]));
    dispatch(setSelectedEditShippingAddress(shippingAddresses[id]));
    return id;
  };
  return (
    <div className="mt-5 flex h-[200px] w-full flex-wrap gap-3">
      {shippingAddresses && shippingAddresses.length > 0
        ? shippingAddresses.map((item, id) => (
            <ShippingItem
              {...item}
              handleEditShippingAddress={() => handleEditShippingAddress(id)}
            />
          ))
        : "You do not have a shipping address saved."}
    </div>
  );
};
export default ShippingInformationSection;
