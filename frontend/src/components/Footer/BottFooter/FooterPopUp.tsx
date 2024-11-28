import React from "react";
interface IfooterPopUpProps {
  title: string;
  setOpen: (value: boolean) => void;
  open: boolean;
  selectedTitle: string;
  setSelectedTitle: (value: string) => void;
  value: {
    value: string;
    code?: string;
  }[];
}
const FooterPopUp: React.FC<IfooterPopUpProps> = ({
  setOpen,
  selectedTitle,
  setSelectedTitle,
  open,
  value,
  title,
}) => {
  const onClickClose = () => {
    setOpen(!open);
  };
  const onClickValue = (name: string) => {
    setSelectedTitle(name);
    setOpen(false);
  };
  return (
    <div>
      <h3 className="mb-2 mt-3">
        {title}
        {title === "Currency" && (
          <span className="group relative ml-1 cursor-pointer rounded-full bg-black px-[6px] py-[1px] text-sm text-white">
            <div className="absolute bottom-full left-1/2 z-10 mb-2 hidden w-[250px] -translate-x-1/2 transform rounded-lg bg-gray-800 px-3 py-2 text-sm text-white group-hover:block">
              When updating your currency, any active Bids/Asks will be
              converted to the closest currency increment
              <div className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 transform bg-gray-800"></div>
            </div>
            ?
          </span>
        )}
      </h3>
      <div className="">
        <li
          className="z-9 relative max-h-[290px] cursor-pointer rounded-lg border border-[#a4a4a4] px-4 py-2"
          onClick={onClickClose}
        >
          {selectedTitle}
        </li>

        {open && (
          <div className="absolute z-10 max-h-[290px] w-4/5 cursor-pointer overflow-y-auto rounded-lg border border-[#a4a4a4] bg-white">
            {value.map((obj, id) => (
              <li
                onClick={() => onClickValue(obj.value)}
                className="mb-1 p-1 hover:bg-[green] hover:text-white"
                key={id}
              >
                {obj.value}
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FooterPopUp;
