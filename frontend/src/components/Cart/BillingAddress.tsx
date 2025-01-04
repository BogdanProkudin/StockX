import React, { useEffect, useState } from "react";

import CountryPopUp from "./CountryPopUp";

interface BillingAddressProps {
  setBills: () => void;
}
const BillingAddress: React.FC<BillingAddressProps> = ({ setBills }) => {
  const billArr = [
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
  const [billForm, setbillForm] = useState<{ [key: string]: string }[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    billArr.reduce((acc, field) => ({ ...acc, [field.key]: "" }), {}),
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
      const formDataBills = localStorage.getItem("BillingAddress");
      if (!formDataBills) {
        const formDataArr = [];
        formDataArr.push(formData);
        localStorage.setItem("formDataShip", JSON.stringify(formDataArr));
      } else {
        const formDataArr = [];
        formDataArr.push(JSON.parse(formDataBills));
        formDataArr.push(formData);
        localStorage.setItem("BillingAddress", JSON.stringify(formDataArr));
      }
      console.log("success", formData);
      setBills();
    }
  };
  useEffect(() => {
    const savedData = localStorage.getItem("BillingAddress");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setbillForm(parsedData);
      console.log(billForm);
    }
  }, []);
  const onClickDelete = (id: number) => {
    const updatedBillForm = billForm.filter((_, index) => index !== id);
    setbillForm(updatedBillForm);
    if (updatedBillForm.length === 0) {
      localStorage.removeItem("formDataShip");
    } else {
      localStorage.setItem("formDataShip", JSON.stringify(updatedBillForm));
    }
  };
  const onUseDefaultForm = (id: number) => {
    const updatedBillForm = billForm.find((_, index) => index == id);
    console.log(updatedBillForm);
    setFormData(updatedBillForm as { [key: string]: string });
  };

  return (
    <div>
      <h1 className="mb-3 text-2xl font-bold">Billing Address</h1>
      <p className="mb-3 text-[#777777]">
        Please enter the address associated with this card
      </p>
      {billForm.length > 0 && (
        <>
          <h1>Default Ship Form</h1>
          <div
            className={`${billForm.length > 1 ? "scroll max-h-[80px] overflow-y-auto pr-2" : ""}`}
          >
            {billForm.map((obj, id) => (
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
        {billArr.map((obj, id) => (
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
          If you are a VAT registered business in the EU save your address then
          visit your settings page to enter your VAT ID. This will enroll you in
          StockX’s VAT program. Read our EU VAT FAQ
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

export default BillingAddress;
