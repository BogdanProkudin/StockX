import React from "react";
import Apparel from "../../../assets/images/HolidayCampaign_XpressShipApparel_Evergreen_SecondaryA.webp";
import Wallet from "../../../assets/images/Wallets-Card_Holders-Banners-ENSecondaryB.webp";
const CardSection = () => {
  return (
    <div className="mb-10 mt-28 flex gap-5">
      <img className="cursor-pointer rounded-2xl" src={Apparel} alt="Apparel" />
      <img className="cursor-pointer rounded-2xl" src={Wallet} alt="Wallet" />
    </div>
  );
};

export default CardSection;
