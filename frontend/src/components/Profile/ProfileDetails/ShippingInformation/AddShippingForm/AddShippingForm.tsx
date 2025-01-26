import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  ProfileFormType,
  ShippingFormType,
} from "../../../../../@types/ProfileFormTyoes";
import AddShipingInput from "./AddShipingInput";
import AddShippingCountrySelector from "./AddShippingCountrySelector";
import AddShippingButton from "./AddShippingButton";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook";
import {
  AddShippingAddress,
  EditShippingAddress,
} from "../../../../../redux/thunks/profileThunks";
import { useNavigate } from "react-router-dom";
import { log } from "node:console";
import { GetShippingAddress } from "../../../../../redux/thunks/cartThunks";
const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "First Name must be at least 2 characters")
    .matches(/^[A-Za-z]+$/, "First Name cannot contain symbols and numbers")
    .required("First Name is required"),
  lastName: yup
    .string()
    .min(2, "Last Name must be at least 2 characters")
    .matches(/^[A-Za-z]+$/, "Last Name cannot contain symbols and numbers")
    .required("Last Name is required"),

  address: yup.string().required("Address is required"),
  city: yup
    .string()
    .required("City is required")
    .min(2, "City must be at least 2 characters")
    .matches(/^[A-Za-z]+$/, "City cannot contain symbols and numbers"),
  state: yup
    .string()
    .required("State/Region is required")
    .min(2, "State/Region must be at least 2 characters")
    .matches(/^[A-Za-z]+$/, "State/Region cannot contain symbols and numbers"),
  postalCode: yup
    .string()
    .matches(/^\d{5}$/, "Postal Code must be 5 digits")
    .required("Postal Code is required"),
  phoneNumber: yup
    .string()
    .matches(/^\+?[0-9]\d{0,14}(\s?\d+)*$/, "Phone Number must be 10 digits")
    .required("Phone Number format is invalid"),
});

const AddShippingForm = ({ version }: { version: string }) => {
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<ShippingFormType>({
    resolver: yupResolver(schema),
  });
  const selectedEditShippingAddresses = JSON.parse(
    localStorage.getItem("editShipping") || "{}",
  );
  const [country, setCountry] = useState("");
  const [defaultShippingAddress, setDefaultShippingAddress] = useState({});
  const [isShippingAddressExist, setIsShippingAddressExist] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isCountrySelectedError, setIsCountrySelectedError] = useState(false);

  useEffect(() => {
    const getShippingAddress = async () => {
      if (!token) {
        return;
      }
      if (version === "CartShippingForm") {
        const response = await dispatch(GetShippingAddress({ token }));
        console.log(response, "res");
      }
    };
    getShippingAddress();
  }, [version]);
  useEffect(() => {
    if (
      selectedEditShippingAddresses &&
      selectedEditShippingAddresses.country
    ) {
      setIsLoading(false);

      setValue("firstName", selectedEditShippingAddresses.firstName);
      setValue("lastName", selectedEditShippingAddresses.lastName);
      setValue("address", selectedEditShippingAddresses.address);
      setValue("address2", selectedEditShippingAddresses.address2);
      setValue("city", selectedEditShippingAddresses.city);
      setCountry(selectedEditShippingAddresses.country);
      setValue("phoneNumber", selectedEditShippingAddresses.phoneNumber);
      setValue("postalCode", selectedEditShippingAddresses.postalCode);
      setValue("state", selectedEditShippingAddresses.state);
    }
    if (selectedEditShippingAddresses.id) {
      setIsShippingAddressExist(true);
      console.log("найден айдишка");
    } else {
      setIsShippingAddressExist(false);
    }
  }, [setValue]);
  const onSubmit = async (data: any) => {
    if (!token) return;
    if (country.length === 0) {
      setIsCountrySelectedError(true);
      return;
    }

    if (isShippingAddressExist) {
      data.country = country;
      data.id = selectedEditShippingAddresses.id;
      console.log(
        "shipping address exist",
        data,
        selectedEditShippingAddresses,
      );

      const response = await dispatch(
        EditShippingAddress({ token, userData: data }),
      );

      if (response.meta.requestStatus === "fulfilled") {
        localStorage.setItem("editShipping", "");
        navigate("/profile");
      }
      return;
    }
    const id = "id" + new Date().getTime();

    data.country = country;
    data.id = id;
    const response = await dispatch(
      AddShippingAddress({ token, userData: data }),
    );
    if (response.meta.requestStatus === "fulfilled") {
      localStorage.setItem("editShipping", "");
      navigate("/profile");
    }
  };
  useEffect(() => {
    console.log(selectedEditShippingAddresses, "selected");
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex h-full w-full justify-center ${
        version !== "CartShippingForm" ? "bg-[#EDEDED] pt-10" : ""
      }`}
    >
      {!isLoading && (
        <div className="w-[500px]">
          <h1 className="mb-4 text-[24px] font-bold text-[#242424]">
            Shipping
          </h1>
          <span className="text-[16px] text-[#242424]">
            Enter your shipping details below.
          </span>
          <div className="mt-4 flex flex-col">
            <AddShipingInput
              inputName="firstName"
              register={register}
              errors={errors}
            />
            <AddShipingInput
              inputName="lastName"
              register={register}
              errors={errors}
            />
            <AddShippingCountrySelector
              country={country}
              setCountry={setCountry}
              setIsCountrySelectedError={setIsCountrySelectedError}
              isCountrySelectedError={isCountrySelectedError}
            />
            <AddShipingInput
              inputName="address"
              register={register}
              errors={errors}
            />
            <AddShipingInput
              inputName="address2"
              register={register}
              errors={errors}
            />
            <AddShipingInput
              inputName="city"
              register={register}
              errors={errors}
            />
            <div className="flex justify-between gap-4">
              <AddShipingInput
                inputName="state"
                register={register}
                errors={errors}
              />
              <AddShipingInput
                inputName="postalCode"
                register={register}
                errors={errors}
              />
            </div>
            <AddShipingInput
              inputName="phoneNumber"
              register={register}
              errors={errors}
            />
          </div>
          <div className="mb-4 mt-4 flex justify-between">
            <AddShippingButton
              country={country}
              setIsCountrySelectedError={setIsCountrySelectedError}
              buttonName="Cancel"
            />
            <AddShippingButton
              country={country}
              setIsCountrySelectedError={setIsCountrySelectedError}
              buttonName="Submit"
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default AddShippingForm;
