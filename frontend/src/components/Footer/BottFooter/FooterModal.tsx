import React, { useEffect, useState } from "react";
import {
  bottFooterArray,
  countries,
  currencies,
} from "../../../assets/Footer/Footer";

const FooterModal = () => {
  const [countryOpen, setCountryOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const onClickOpenCountry = () => {
    setCountryOpen(!countryOpen);
  };
  const onClickOpenLanguage = () => {
    setLanguageOpen(!languageOpen);
  };
  const onClickOpenCurrency = () => {
    setCurrencyOpen(!currencyOpen);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative h-[405px] w-[540px] rounded-xl bg-white px-5 py-4">
        <h1 className="text-xl">Change your settings</h1>
        <p className="text-sm">
          Choose your language & your preferred currency below
        </p>
        <div className="absolute left-0 top-[70px] w-full border border-[#e8e8e8]" />
        <div className="mt-3 flex flex-col">
          <p className="mb-1">Region</p>
          <div className="relative max-h-[290px] cursor-pointer overflow-y-auto rounded-lg border border-[#a4a4a4] px-4 py-2">
            <li className="" onClick={onClickOpenCountry}>
              Countries
            </li>
            {countryOpen && (
              <>
                <div className="absolute left-0 top-9 w-full border border-[#e8e8e8]" />
                {countries.map((obj) => (
                  <li className="mb-1 hover:bg-slate-400" key={obj.code}>
                    {obj.name}
                  </li>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="mt-3 flex flex-col">
          <p className="mb-1">Language</p>
          <div className="relative max-h-[290px] cursor-pointer overflow-y-auto rounded-lg border border-[#a4a4a4] px-4 py-2">
            <li className="" onClick={onClickOpenLanguage}>
              English
            </li>
            {languageOpen && (
              <>
                <div className="absolute left-0 top-9 w-full border border-[#e8e8e8]" />
                {bottFooterArray.map((el, id) => (
                  <li className="mb-1 hover:bg-slate-400" key={id}>
                    {el}
                  </li>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="mt-3 flex flex-col">
          <p className="mb-1">Currency</p>
          <div className="relative max-h-[290px] cursor-pointer overflow-y-auto rounded-lg border border-[#a4a4a4] px-4 py-2">
            <li className="" onClick={onClickOpenCurrency}>
              EUR
            </li>
            {currencyOpen && (
              <>
                <div className="absolute left-0 top-9 w-full border border-[#e8e8e8]" />
                {currencies.map((obj) => (
                  <li className="mb-1 hover:bg-slate-400" key={obj.code}>
                    {obj.symbol}
                  </li>
                ))}
              </>
            )}
          </div>
        </div>
        <div>
          <button>Cancel</button>
          <button>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default FooterModal;
