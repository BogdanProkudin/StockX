import React, { useEffect, useState } from "react";

interface PaymentMethodProps {
  setPayment: () => void;
}
const PaymentMethod: React.FC<PaymentMethodProps> = ({ setPayment }) => {
  //   const [shipForm, setShipForm] = useState<{ [key: string]: string }[]>([]);
  //   const [formData, setFormData] = useState<{ [key: string]: string }>(
  //     shipArr.reduce((acc, field) => ({ ...acc, [field.key]: "" }), {}),
  //   );
  //   const [errors, setErrors] = useState<{ [key: string]: string }>({});
  //   const handleInputChange = (key: string, value: string) => {
  //     setFormData({ ...formData, [key]: value });
  //     setErrors({ ...errors, [key]: "" });
  //   };

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();

  //     const newErrors: { [key: string]: string } = {};
  //     Object.entries(formData).forEach(([key, value]) => {
  //       if (!value.trim()) {
  //         newErrors[key] = "This field is required.";
  //       }
  //     });

  //     if (Object.keys(newErrors).length > 0) {
  //       setErrors(newErrors);
  //       console.log(" errors:", newErrors);
  //     } else {
  //       setErrors({ key: "" });
  //       const formDataShip = localStorage.getItem("formDataShip");
  //       if (!formDataShip) {
  //         const formDataArr = [];

  //         formDataArr.push(formData);
  //         localStorage.setItem("formDataShip", JSON.stringify(formDataArr));
  //       } else {
  //         const formDataArr = [];
  //         formDataArr.push(JSON.parse(formDataShip));
  //         formDataArr.push(formData);
  //         localStorage.setItem("formDataShip", JSON.stringify(formDataArr));
  //       }
  //       console.log("success", formData);
  //       setShipping();
  //     }
  //   };
  //   useEffect(() => {
  //     const savedData = localStorage.getItem("formDataShip");
  //     if (savedData) {
  //       const parsedData = JSON.parse(savedData);
  //       setShipForm(parsedData);
  //       console.log(shipForm);
  //     }
  //   }, []);

  //   const onClickDelete = (id: number) => {
  //     const updatedShipForm = shipForm.filter((_, index) => index !== id);
  //     setShipForm(updatedShipForm);
  //     console.log(updatedShipForm);
  //     if (updatedShipForm.length === 0) {
  //       localStorage.removeItem("formDataShip");
  //     } else {
  //       localStorage.setItem("formDataShip", JSON.stringify(updatedShipForm));
  //     }
  //   };
  //   const onUseDefaultForm = (id: number) => {
  //     const updatedShipForm = shipForm.find((_, index) => index == id);

  //     setFormData(updatedShipForm as { [key: string]: string });
  //   };
  return (
    <div>
      <h1 className="mb-3 text-2xl font-bold">PaymentMethod</h1>
      <p className="mb-3 text-[#777777]">
        Enter your details and save to make it easier next time to pay for your
        favorite purchases
      </p>
      <form>
        <div>
          <label>Card Number</label>
          <input
            className="mt-3 w-full rounded-lg border border-[#cfcfcf] px-3 py-2 outline-none"
            type="text"
            placeholder="Card Number"
          />
        </div>
        <div className="mt-5 flex items-center gap-4">
          <div className="flex w-1/2 flex-col">
            <label htmlFor="">3</label>
            <input className="w-full" type="text" />
          </div>
          <div className="flex w-1/2 flex-col">
            <label htmlFor="">3</label>
            <input className="w-4/5" type="text" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethod;
