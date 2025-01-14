import React, { useEffect, useState } from "react";

import CountryPopUp from "./CountryPopUp";

export type formData = {
  firstName: string;
  lastName: string;
  country: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber: string;
};
interface ShipFormProps {
  setShipping: () => void;
}

const ShipForm: React.FC<ShipFormProps> = ({ setShipping }) => {
  const shipArr = [
    {
      labelName: "First Name",
      placeholderName: "Jane",
      key: "firstName",
      type: "text",
    },
    {
      labelName: "Last Name",
      placeholderName: "Doe",
      key: "lastName",
      type: "text",
    },
    {
      labelName: "Country",
      placeholderName: "",
      key: "country",
    },
    {
      labelName: "Address",
      placeholderName: "Street address",
      key: "address",
      type: "text",
    },
    {
      labelName: "Address2",
      placeholderName: "Apartment, suite, unit, building, floor, etc.",
      key: "address2",
      type: "text",
    },
    {
      labelName: "City",
      placeholderName: "",
      key: "city",
      type: "text",
    },
    {
      labelName: "State/Region",
      placeholderName: "",
      key: "state",
      type: "text",
    },
    {
      labelName: "Postal Code",
      placeholderName: "",
      key: "postalCode",
      type: "number",
    },
    {
      labelName: "Phone Number",
      placeholderName: "",
      key: "phoneNumber",
      type: "number",
    },
  ];
  const [shipForm, setShipForm] = useState<{ [key: string]: string }[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    shipArr.reduce((acc, field) => ({ ...acc, [field.key]: "" }), {}),
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(" errors:", newErrors);
    } else {
      setErrors({ key: "" });

      const data = localStorage.getItem("formDataShip");
      const storedAddresses: formData[] = data ? JSON.parse(data) : [];

      const isDuplicate = storedAddresses.some(
        (address) => JSON.stringify(address) === JSON.stringify(formData),
      );

      if (!isDuplicate) {
        const updatedAddresses = [...storedAddresses, formData];
        localStorage.setItem("formDataShip", JSON.stringify(updatedAddresses));
      }
      console.log("success", formData);
      setShipping();
    }
  };
  useEffect(() => {
    const savedData = localStorage.getItem("formDataShip");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setShipForm(parsedData);
      console.log(shipForm);
    }
  }, []);

  const onClickDelete = (id: number) => {
    const updatedShipForm = shipForm.filter((_, index) => index !== id);
    setShipForm(updatedShipForm);
    console.log(updatedShipForm);
    if (updatedShipForm.length === 0) {
      localStorage.removeItem("formDataShip");
    } else {
      localStorage.setItem("formDataShip", JSON.stringify(updatedShipForm));
    }
  };
  const onUseDefaultForm = (id: number) => {
    const updatedShipForm = shipForm.find((_, index) => index == id);

    setFormData(updatedShipForm as { [key: string]: string });
  };

  return (
    <div>
      <h1 className="mb-3 text-2xl font-bold">Shipping</h1>
      <p className="mb-3 text-[#777777]">Enter your shipping details below.</p>
      {shipForm.length > 0 && (
        <>
          <h1>Default Ship Form</h1>
          <div
            className={`${shipForm.length > 1 ? "scroll max-h-[80px] overflow-y-auto pr-2" : ""}`}
          >
            {shipForm.map((obj, id) => (
              <div
                key={id}
                className="mb-2 flex w-full justify-between rounded-lg border border-[#cfcfcf] bg-white px-4 py-3"
              >
                <div className="">
                  <p className="text-[#777777]">
                    Address:{obj.address} {obj.address2}
                  </p>
                  <p className="text-[#777777]">Country:{obj.country}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUseDefaultForm(id)}
                    className="text-[#006340]"
                  >
                    Use As Default
                  </button>
                  <button
                    onClick={() => onClickDelete(id)}
                    className="text-[#962f2f]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <form onSubmit={handleSubmit}>
        {shipArr.map((obj, id) => (
          <div className="mb-1 flex flex-col gap-1" key={id}>
            <label htmlFor="">{obj.labelName}</label>
            {obj.labelName === "Country" ? (
              <CountryPopUp handleInputChange={handleInputChange} />
            ) : (
              <>
                <input
                  id={obj.key}
                  className={`rounded-lg border border-[#cfcfcf] px-3 py-2 outline-none ${
                    errors[obj.key]
                      ? "border-red-500"
                      : "hover:border-[#006340] focus:border-[#006340]"
                  }`}
                  type={obj.type}
                  placeholder={obj.placeholderName}
                  value={formData[obj.key] || ""}
                  onChange={(e) => handleInputChange(obj.key, e.target.value)}
                />
                {errors[obj.key] && (
                  <span className="text-sm text-red-500">
                    {errors[obj.key]}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
        <p className="text-[#777777]">
          This will be saved as your default shipping address.
        </p>
        <button
          className="mb-5 mt-3 rounded-full bg-[#006340] px-3 py-2 text-white transition-all duration-300 ease-in-out hover:bg-[#008000]"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ShipForm;
