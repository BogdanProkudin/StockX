import React, { useEffect, useState } from "react";

import CountryPopUp from "./CountryPopUp";

const ShipForm = () => {
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
      let formDataShip = localStorage.getItem("formDataShip");
      if (!formDataShip) {
        formDataShip = JSON.stringify(formData);
        localStorage.setItem("formDataShip", formDataShip);
      } else {
        const formDataArr = [];
        formDataArr.push(JSON.parse(formDataShip));
        formDataArr.push(formData);
        localStorage.setItem("formDataShip", JSON.stringify(formDataArr));
      }
      console.log("success", formData);
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
  return (
    <div>
      <h1 className="mb-3 text-2xl font-bold">Shipping</h1>
      <p className="mb-3 text-[#777777]">Enter your shipping details below.</p>
      {shipForm.length > 0 && (
        <>
          <h1>Default Ship Form</h1>
          <div className="mb-2 w-full rounded-lg border border-[#cfcfcf] bg-white px-4 py-3">
            <div className="">
              <p className="text-[#777777]">
                Address:{shipForm[0]?.address} {shipForm[0]?.address2}
              </p>
              <p className="text-[#777777]">Country:{shipForm[0]?.country}</p>
            </div>
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
