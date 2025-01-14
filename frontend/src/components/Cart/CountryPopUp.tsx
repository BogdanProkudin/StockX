import React, { useEffect, useState } from "react";
import { countries } from "../../assets/Footer/Footer";

interface CountryPopUpProps {
  handleInputChange: (key: string, value: string) => void;
}

const CountryPopUp: React.FC<CountryPopUpProps> = ({ handleInputChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("Austria");
  const onClickClose = () => {
    setOpen(!open);
  };
  const onClickValue = (name: string) => {
    setSelectedTitle(name);
    setOpen(false);
  };
  useEffect(() => {
    handleInputChange("country", selectedTitle);
  }, [selectedTitle]);
  return (
    <div className="">
      <li
        className={`z-9 relative max-h-[290px] cursor-pointer rounded-lg border border-[#cfcfcf] bg-white px-4 py-2 hover:border-[#006340] ${
          open ? "rounded-b-none" : ""
        }`}
        onClick={onClickClose}
      >
        {selectedTitle}
      </li>

      {open && (
        <div className="scroll absolute z-10 max-h-[290px] w-[544px] cursor-pointer overflow-y-auto rounded-lg rounded-t-none border-b border-l border-r border-[#a4a4a4] bg-white">
          {countries.map((obj, id) => (
            <li
              onClick={() => onClickValue(obj.value)}
              className={`mb-1 p-1 hover:bg-[#008000] hover:text-white ${
                id === countries.length - 1 ? "mb-0" : ""
              }`}
              key={id}
            >
              {obj.value}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryPopUp;
