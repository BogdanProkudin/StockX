import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
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
import {
  AddBillingAddress,
  GetShippingAddress,
} from "../../../../../redux/thunks/cartThunks";
import {
  setSelectedBillingAddress,
  setSelectedShippingAddress,
  setUserShippingAddress,
  ShipForm,
} from "../../../../../redux/slices/cartSlice";
import { IUser } from "../../../../../@types/userAuth";
import { log } from "node:console";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Must be at least 2 characters")
    .matches(/^[A-Za-z]+$/, "No symbols or numbers")
    .required(),
  lastName: yup
    .string()
    .min(2, "Must be at least 2 characters")
    .matches(/^[A-Za-z]+$/, "No symbols or numbers")
    .required(),
  address: yup.string().required("Address is required"),
  city: yup
    .string()
    .min(2, "Must be at least 2 characters")
    .matches(/^[A-Za-z]+$/, "No symbols or numbers")
    .required(),
  state: yup
    .string()
    .min(2, "Must be at least 2 characters")
    .matches(/^[A-Za-z]+$/, "No symbols or numbers")
    .required(),
  postalCode: yup
    .number()
    // .matches(/^\d{5}$/, "Must be 5 digits")
    .required(),
  phoneNumber: yup
    .number()
    // .matches(/^\+?[0-9]\d{0,14}(\s?\d+)*$/, "Invalid format")
    .required(),
});

const AddShippingForm = ({
  version,
  setIsOpen,
}: {
  version: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ShipForm>({ resolver: yupResolver(schema) });

  const selectedEditShippingAddresses = JSON.parse(
    localStorage.getItem("editShipping") || "{}",
  );
  const selectedEditBillingAddresses = JSON.parse(
    localStorage.getItem("editBilling") || "{}",
  );
  const userShippingAddress = useAppSelector(
    (state) => state.cartSlice.userShippingAddress,
  );
  const token = localStorage.getItem("token");

  const [country, setCountry] = useState("");
  const [isShippingAddressExist, setIsShippingAddressExist] = useState(
    !!selectedEditShippingAddresses.id,
  );

  const [isBillingAddressExist, setIsBillingAddressExist] = useState(
    !!selectedEditBillingAddresses.id,
  );
  const [isCountrySelectedError, setIsCountrySelectedError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const setFormValues = useCallback(
    (data: any) => {
      console.log(data, "data");

      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      setValue("address", data.address);
      setValue("address2", data.address2);
      setValue("city", data.city);
      setValue("phoneNumber", data.phoneNumber);
      setValue("postalCode", data.postalCode);
      setValue("state", data.state);
      setCountry(data.country);
    },
    [setValue],
  );

  useEffect(() => {
    if (token && version === "CartShippingForm") {
      dispatch(GetShippingAddress({ token }));
    }
  }, [version, token, dispatch]);

  useEffect(() => {
    if (
      selectedEditShippingAddresses?.country &&
      version !== "CartShippingForm"
    ) {
      setIsLoading(false);
      setFormValues(selectedEditShippingAddresses);
    }
    console.log(version, selectedEditBillingAddresses);

    if (version == "BillingAddress" && selectedEditBillingAddresses?.country) {
      setIsLoading(false);
      setFormValues(selectedEditBillingAddresses);
    }
  }, [
    setFormValues,
    selectedEditBillingAddresses,
    selectedEditShippingAddresses,
  ]);

  const handleUseDefaultAddress = () => {
    if (userShippingAddress) {
      setFormValues(userShippingAddress);
    }
  };

  const onSubmit = async (data: ShipForm) => {
    if (!token) {
      return;
    }
    if (!country) {
      setIsCountrySelectedError(true);
      return;
    }

    const requestData: ShipForm = {
      ...data,

      country,
      postalCode: data.postalCode,
    };
    if (version === "CartShippingForm") {
      // dispatch(setSelectedShippingAddress(data));
      const response = await dispatch(
        AddShippingAddress({ token, userData: requestData }),
      );
      dispatch(setUserShippingAddress(response.payload?.shippingAddresses[0]));

      setIsOpen(false);
      return;
    }
    if (version === "BillingAddress") {
      requestData.id = `id${Date.now()}`; // Генерация уникального ID
      console.log(country, "counry", data);

      if (isBillingAddressExist) {
        localStorage.removeItem("editBilling");
        setIsOpen(false);
        console.log("BILING EXIST");
        return;
      }
      const response = await dispatch(
        AddBillingAddress({ token, userData: requestData }),
      );
      localStorage.removeItem("editBilling");
      dispatch(
        setSelectedBillingAddress(response.payload?.billingAddresses[0]),
      );
      setIsOpen(false);
      return;
    }
    console.log("ISS", isShippingAddressExist);

    if (isShippingAddressExist) {
      requestData.id = selectedEditShippingAddresses.id;
      console.log("Редактирование адреса:", requestData);

      const response = await dispatch(
        EditShippingAddress({ token, userData: requestData }),
      );

      if (response.meta.requestStatus === "fulfilled") {
        console.log("Адрес успешно отредактирован!");
        localStorage.removeItem("editShipping");
        navigate("/profile");
      } else {
        console.error("Ошибка при редактировании адреса", response);
      }
    } else {
      requestData.id = `id${Date.now()}`; // Генерация уникального ID
      console.log("Добавление нового адреса:", requestData);

      const response = await dispatch(
        AddShippingAddress({ token, userData: requestData }),
      );

      if (response.meta.requestStatus === "fulfilled") {
        console.log("Адрес успешно добавлен!");
        localStorage.removeItem("editShipping");
        navigate("/profile");
      } else {
        console.error("Ошибка при добавлении адреса", response);
      }
    }
  };

  return (
    <div
      className={`flex w-full min-w-[500px] flex-col items-center justify-center`}
    >
      {version === "CartShippingForm" && userShippingAddress?.firstName && (
        <div className="mb-2 flex w-full max-w-[500px] justify-between rounded-lg border border-[#cfcfcf] bg-white px-4 py-3">
          <div>
            <p className="text-[#777777]">
              Address: {userShippingAddress.address}{" "}
              {userShippingAddress.address2}
            </p>
            <p className="text-[#777777]">
              Country: {userShippingAddress.country}
            </p>
          </div>
          <button onClick={handleUseDefaultAddress} className="text-[#006340]">
            Use This Address
          </button>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex h-full w-full items-center justify-center ${version === "CartShippingForm" ? "w-[90%] flex-col" : version === "BillingAddress" ? "w-full" : "bg-[#EDEDED] pt-10"} `}
      >
        {!isLoading && (
          <div className="w-[500px]">
            <h1 className="mb-4 text-[24px] font-bold text-[#242424]">
              {version === "BillingAddress" ? "Billing Address" : "Shipping"}
            </h1>
            <span className="text-[16px] text-[#242424]">
              {version === "BillingAddress"
                ? " Enter your billing details below."
                : " Enter your shipping details below."}
            </span>
            <div className="mt-4 flex flex-col">
              {[
                "firstName",
                "lastName",
                "address",
                "address2",
                "city",
                "state",
                "postalCode",
                "phoneNumber",
              ].map((inputName) => (
                <AddShipingInput
                  key={inputName}
                  inputName={inputName as keyof ShippingFormType}
                  register={register}
                  errors={errors}
                />
              ))}
              <AddShippingCountrySelector
                country={country}
                setCountry={setCountry}
                setIsCountrySelectedError={setIsCountrySelectedError}
                isCountrySelectedError={isCountrySelectedError}
              />
            </div>
            <div className="mb-4 mt-4 flex justify-between">
              {["Cancel", "Submit"].map((buttonName) => (
                <AddShippingButton
                  key={buttonName}
                  version={version}
                  setIsOpen={setIsOpen}
                  country={country}
                  setIsCountrySelectedError={setIsCountrySelectedError}
                  buttonName={buttonName}
                />
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddShippingForm;
