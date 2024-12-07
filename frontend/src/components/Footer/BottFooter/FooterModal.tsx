import React, { useEffect, useState } from "react";
import {
  languages,
  countries,
  currencies,
} from "../../../assets/Footer/Footer";
import FooterPopUp from "./FooterPopUp";
interface IfooterModel {
  onClose: () => void;
  country: string;
  language: string;
  currency: string;
  handleSaveChanges: (
    selectedCountry: string,
    selectedLanguage: string,
    selectedCurrency: string,
  ) => void;
}
const FooterModal: React.FC<IfooterModel> = ({
  onClose,
  country,
  language,
  currency,
  handleSaveChanges,
}) => {
  const [openPopUp, setOpenPopUp] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>(country);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(language);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(currency);

  const handlePopUp = (value: string) => {
    setOpenPopUp((prev) => (prev === value ? null : value));
  };
  const onSave = () => {
    handleSaveChanges(selectedCountry, selectedLanguage, selectedCurrency);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative -top-[50px] h-[405px] w-[540px] rounded-xl bg-white px-5 py-4">
        <h1 className="text-xl">Change your settings</h1>
        <p className="text-sm">
          Choose your language & your preferred currency below
        </p>
        <div className="absolute left-0 top-[70px] w-full border border-[#e8e8e8]" />
        <FooterPopUp
          title={"Region"}
          selectedTitle={selectedCountry}
          setSelectedTitle={setSelectedCountry}
          open={openPopUp === "country"}
          setOpen={() => handlePopUp("country")}
          value={countries}
        />
        <FooterPopUp
          title={"Language"}
          selectedTitle={selectedLanguage}
          setSelectedTitle={setSelectedLanguage}
          open={openPopUp === "language"}
          setOpen={() => handlePopUp("language")}
          value={languages}
        />
        <FooterPopUp
          title={"Currency"}
          selectedTitle={selectedCurrency}
          setSelectedTitle={setSelectedCurrency}
          open={openPopUp === "currency"}
          setOpen={() => handlePopUp("currency")}
          value={currencies}
        />
        <div className="mt-7 flex items-center justify-between">
          <div className="z-1 absolute left-0 top-[335px] w-full border border-[#e8e8e8]" />
          <button
            onClick={onClose}
            className="rounded-3xl border border-black px-4 py-1.5 text-lg font-bold transition-all duration-200 ease-in-out hover:bg-black hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="rounded-3xl border border-black bg-black px-4 py-1.5 text-lg font-bold text-white transition-all duration-200 ease-in-out"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterModal;
