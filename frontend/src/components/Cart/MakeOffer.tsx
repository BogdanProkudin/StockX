import React from "react";

interface MakeOfferProps {
  price: number | undefined;
}
const MakeOffer: React.FC<MakeOfferProps> = ({ price }) => {
  const goodBid = Number(price) * 0.8;
  const betterBid = Number(price) * 0.9;

  const priceOptionArr = [
    { priceVariant: goodBid, subTital: "Good Bid" },
    { priceVariant: betterBid, subTital: "Better Bid" },
    {
      priceVariant: price,
      subTital: "Buy Now",
    },
  ];
  return (
    <div className="rounded-xl bg-white px-5 py-5">
      <h4 className="font-semibold">Pricing Options</h4>
      <div>
        {priceOptionArr.map((obj) => (
          <button key={obj.priceVariant}>{obj.subTital}</button>
        ))}
      </div>
    </div>
  );
};

export default MakeOffer;
