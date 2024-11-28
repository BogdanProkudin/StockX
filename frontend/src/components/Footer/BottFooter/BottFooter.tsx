import React, { useState } from "react";
import {
  bottFooterArray,
  bottFooterSecondArray,
  bottFooterMidArray,
} from "../../../assets/Footer/Footer";
import { Link } from "react-router-dom";
import FooterModal from "./FooterModal";

const BottFooter = () => {
  const [isModal, setIsModal] = useState(false);
  const [country, setdCountry] = useState("Austria");
  const [language, setLanguage] = useState("English (US)");
  const [currency, setCurrency] = useState("€ EUR");
  const handleSaveChanges = (
    selectedCountry: string,
    selectedLanguage: string,
    selectedCurrency: string,
  ) => {
    setdCountry(selectedCountry);
    setLanguage(selectedLanguage);
    setCurrency(selectedCurrency);
    setIsModal(false);
  };
  return (
    <div className="bg-[#0f0f0f]">
      <div className="container px-[32px] py-[24px]">
        <div className="mb-4 flex items-center justify-between">
          <div className="w-[402px]">
            <button
              onClick={() => setIsModal(true)}
              className="text-md hover: rounded-xl border border-white px-4 py-2 font-bold text-white transition-all duration-300 ease-in-out hover:border-black hover:bg-white hover:text-black"
            >
              {country} | {language} | {currency}
            </button>
          </div>
          {isModal && (
            <FooterModal
              country={country}
              language={language}
              currency={currency}
              handleSaveChanges={handleSaveChanges}
              onClose={() => setIsModal(false)}
            />
          )}
          <div className="flex items-center gap-5">
            {bottFooterMidArray.map((obj, id) => (
              <Link className="fill-white text-white" to={obj.link} key={id}>
                {obj.img}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {bottFooterSecondArray.map((el, id) => (
              <span
                className="cursor-pointer text-xs text-white hover:underline"
                key={id}
              >
                {el}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-3">
          {bottFooterArray.map((el, id) => (
            <span
              className="cursor-pointer text-xs text-white hover:underline"
              key={id}
            >
              {el}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottFooter;
