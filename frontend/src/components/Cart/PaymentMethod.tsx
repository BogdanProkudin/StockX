import React, { useEffect, useState } from "react";

import visa from "../../assets/Cart/visa-svgrepo-com.svg";
import masterCard from "../../assets/Cart/mastercard-svgrepo-com.svg";
import unknown from "../../assets/Cart/card.svg";

interface PaymentMethodProps {
  setPayment: () => void;
}
interface FormData {
  holderName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
  cardType: string;
}
const PaymentMethod: React.FC<PaymentMethodProps> = ({ setPayment }) => {
  const [savedCards, setSavedCards] = useState<FormData[]>([]);
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("unknown");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [holderName, setHolderName] = useState("");
  const [errors, setErrors] = useState({
    holderName: false,
    cardNumber: false,
    expDate: false,
    cvv: false,
  });

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    const formattedValue = value.match(/.{1,4}/g)?.join("-") || "";
    setCardNumber(formattedValue);
    if (value.startsWith("4")) {
      setCardType("visa");
    } else if (
      /^5[1-5]/.test(value) ||
      /^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/.test(value)
    ) {
      setCardType("mastercard");
    } else {
      setCardType("unknown");
    }
  };

  const handleExparationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    let numericValue = value.replace(/\D/g, "");

    numericValue = numericValue.slice(0, 4);

    if (numericValue.length >= 2) {
      const month = parseInt(numericValue.slice(0, 2), 10);

      if (month > 12) {
        numericValue = `12${numericValue.slice(2)}`;
      }

      if (numericValue.length === 4) {
        const currentYear = new Date().getFullYear() % 100;
        const year = parseInt(numericValue.slice(2), 10);

        if (year < currentYear) {
          numericValue = `${numericValue.slice(0, 2)}${currentYear}`;
        } else if (year > currentYear + 40) {
          numericValue = `${numericValue.slice(0, 2)}${currentYear + 40}`;
        }
      }
    }

    const formattedValue = numericValue.match(/.{1,2}/g)?.join("/") || "";

    setExpDate(formattedValue);
  };
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\D/g, "").slice(0, 3);
    setCvv(formattedValue);
  };

  const onClickCancel = () => {
    setPayment();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      holderName: holderName.trim() === "",
      cardNumber:
        (cardNumber.trim() === "" && cardNumber.length < 16) ||
        (cardType === "unknown" && cardNumber.length < 16),
      expDate: expDate.trim() === "" && expDate.length < 5,
      cvv: cvv.trim() === "" && cvv.length < 3,
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => !error);

    if (isValid) {
      const formData = { holderName, cardNumber, expDate, cvv, cardType };
      const data = localStorage.getItem("formDataPayment");

      const existingData: FormData[] = data ? JSON.parse(data) : [];

      const existedData = existingData.find(
        (item) => item.cardNumber === formData.cardNumber,
      );

      if (existedData) {
        const updatedData = [...existingData];
        localStorage.setItem("formDataPayment", JSON.stringify(updatedData));
      } else {
        const updatedData = [...existingData, formData];
        localStorage.setItem("formDataPayment", JSON.stringify(updatedData));
      }

      console.log("Form submitted successfully!");
      setPayment();
    } else {
      console.log("Please fill all fields correctly.");
    }
  };
  useEffect(() => {
    const savedData = localStorage.getItem("formDataPayment");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setSavedCards(parsedData);
    }
  }, []);
  const onClickDelete = (id: number) => {
    const updatedSavedCards = savedCards.filter((_, index) => index !== id);
    setSavedCards(updatedSavedCards);
    console.log(updatedSavedCards);
    if (updatedSavedCards.length === 0) {
      localStorage.removeItem("formDataPayment");
    } else {
      localStorage.setItem(
        "formDataPayment",
        JSON.stringify(updatedSavedCards),
      );
    }
  };
  const onUseDefaultForm = (id: number) => {
    const updatedSavedCards = savedCards.find((_, index) => index == id);
    if (updatedSavedCards) {
      setHolderName(updatedSavedCards.holderName);
      setCardNumber(updatedSavedCards.cardNumber);
      setExpDate(updatedSavedCards.expDate);
      setCvv(updatedSavedCards.cvv);
      setCardType(updatedSavedCards.cardType);
    }
    console.log(updatedSavedCards);
  };
  return (
    <div className={`${savedCards.length > 0 ? "h-[50vh]" : "h-[65vh]"}`}>
      <h1 className="mb-3 text-2xl font-bold">Payment Method</h1>
      <p className="mb-3 text-[#777777]">
        Enter your details and save to make it easier next time to pay for your
        favorite purchases
      </p>
      {savedCards.length > 0 && (
        <>
          <h1 className="mb-1 text-lg font-bold">Saved Cards:</h1>
          <div
            className={`${savedCards.length > 1 ? "scroll max-h-[80px] overflow-y-auto pr-2" : ""}`}
          >
            {savedCards.map((obj, id) => (
              <div
                key={id}
                className="mb-2 flex w-full justify-between rounded-lg border border-[#cfcfcf] bg-white px-4 py-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="w-12"
                    src={obj.cardType === "visa" ? visa : masterCard}
                    alt=""
                  />
                  <span>{obj.cardNumber}</span>
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
      <form
        onSubmit={handleSubmit}
        className="flex h-full flex-col justify-between"
      >
        <div>
          <label>Holder Name</label>
          <input
            className={`mb-5 mt-2 w-full rounded-lg border px-3 py-2 outline-none ${
              errors.holderName ? "border-red-500" : "border-[#cfcfcf]"
            }`}
            type="text"
            placeholder="Card Holder Name"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
          />
          <div className="relative mb-5">
            <label>Card Number</label>
            <input
              className={`mt-2 w-full rounded-lg border py-2 pl-[46px] outline-none ${
                errors.cardNumber ? "border-red-500" : "border-[#cfcfcf]"
              }`}
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
            <img
              className={`absolute ${
                cardType === "unknown"
                  ? "bottom-[6px] left-2 w-7"
                  : "bottom-[2px] left-[2px] w-10"
              }`}
              src={
                cardType === "visa"
                  ? visa
                  : cardType === "mastercard"
                    ? masterCard
                    : unknown
              }
              alt=""
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-2">
              <label>Expiration date</label>
              <input
                onChange={handleExparationChange}
                value={expDate}
                className={`mb-5 w-full rounded-lg border px-3 py-2 outline-none ${
                  errors.expDate ? "border-red-500" : "border-[#cfcfcf]"
                }`}
                type="text"
                placeholder="MM/YY"
              />
            </div>
            <div className="flex w-1/2 flex-col gap-2">
              <label>CVV</label>
              <input
                className={`mb-5 w-full rounded-lg border px-3 py-2 outline-none ${
                  errors.cvv ? "border-red-500" : "border-[#cfcfcf]"
                }`}
                value={cvv}
                onChange={handleCvvChange}
                type="text"
                placeholder="445"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={onClickCancel}
            className="rounded-2xl bg-black px-4 py-[6px] text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-2xl bg-[#006340] px-4 py-[6px] text-white transition-all duration-300 ease-in-out hover:bg-[#008000]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethod;
