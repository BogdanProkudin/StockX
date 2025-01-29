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
import { GetShippingAddress } from "../../../../../redux/thunks/cartThunks";
import { ShipForm } from "../../../../../redux/slices/cartSlice";
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
  setShipping,
}: {
  version: string;
  setShipping: Dispatch<SetStateAction<boolean>>;
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
  const userShippingAddress = useAppSelector(
    (state) => state.cartSlice.userShippingAddress,
  );
  const token = localStorage.getItem("token");

  const [country, setCountry] = useState("");
  const [isShippingAddressExist, setIsShippingAddressExist] = useState(
    !!selectedEditShippingAddresses.id,
  );
  const [isCountrySelectedError, setIsCountrySelectedError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const setFormValues = useCallback(
    (data: any) => {
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
  }, [setFormValues, selectedEditShippingAddresses]);

  const handleUseDefaultAddress = () => {
    if (userShippingAddress) {
      setFormValues(userShippingAddress);
    }
  };

  // const onSubmit = async (data: ShipForm | IUser) => {
  //   if (!token || version === "CartShippingForm") {
  //     setShipping(false);
  //     return;
  //   }

  //   if (!country) {
  //     setIsCountrySelectedError(true);
  //     return;
  //   }

  //   // Формируем данные с учетом страны и ID
  //   const shippingData:  ShipForm = {
  //     ...data,
  //     country,
  //     id: isShippingAddressExist
  //       ? selectedEditShippingAddresses.id // Для редактирования используем существующий ID
  //       : `id${Date.now()}`, // Для добавления создаём новый уникальный ID
  //   };

  //   // Определяем действие (редактирование или добавление)
  //   const action = isShippingAddressExist
  //     ? EditShippingAddress
  //     : AddShippingAddress;
  //   console.log(action, "action");

  //   // Вызываем Redux-Thunk для отправки данных
  //   const response = await dispatch(action({ token, userData: shippingData }));

  //   // Если запрос выполнен успешно
  //   if (response.meta.requestStatus === "fulfilled") {
  //     localStorage.removeItem("editShipping"); // Удаляем временные данные редактирования
  //     navigate("/profile"); // Перенаправляем на профиль
  //   }
  // };
  const onSubmit = async (data: ShipForm) => {
    if (!token || version === "CartShippingForm") {
      setShipping(false);
      return;
    }

    if (!country) {
      setIsCountrySelectedError(true);
      return;
    }

    // Создаём объект данных с преобразованием `postalCode` в строку
    const shippingData: ShipForm = {
      ...data,

      country,
      postalCode: data.postalCode, // Преобразование в строку
    };

    if (isShippingAddressExist) {
      // 📝 Редактирование существующего адреса
      shippingData.id = selectedEditShippingAddresses.id;
      console.log("Редактирование адреса:", shippingData);

      const response = await dispatch(
        EditShippingAddress({ token, userData: shippingData }),
      );

      if (response.meta.requestStatus === "fulfilled") {
        console.log("Адрес успешно отредактирован!");
        localStorage.removeItem("editShipping");
        navigate("/profile");
      } else {
        console.error("Ошибка при редактировании адреса", response);
      }
    } else {
      // 🆕 Добавление нового адреса
      shippingData.id = `id${Date.now()}`; // Генерация уникального ID
      console.log("Добавление нового адреса:", shippingData);

      const response = await dispatch(
        AddShippingAddress({ token, userData: shippingData }),
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

  const handleUser = (user: IUser) => {
    console.log("Обрабатываем пользователя:", user.userName);
  };

  const handleShipping = (form: ShipForm) => {
    console.log("Обрабатываем форму доставки:", form.address);
  };
  return (
    <div
      className={`} flex w-full min-w-[500px] flex-col items-center justify-center`}
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
        className={`flex h-full w-full justify-center ${version !== "CartShippingForm" ? "bg-[#EDEDED] pt-10" : "w-[90%] flex-col"}`}
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
