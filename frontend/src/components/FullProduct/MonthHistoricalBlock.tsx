import React from "react";
import { NumberOfSales } from "../../utils/NumberOfSales";
interface MonthHistoricalBlockProps {
  averagePrice: number;
  max: number;
  min: number;
  soldItems: number;
}

const MonthHistoricalBlock: React.FC<MonthHistoricalBlockProps> = ({
  averagePrice,
  max,
  min,
  soldItems,
}) => {
  const avgPrice = Math.round(averagePrice);
  const maxPrice = Math.round(max);
  const minPrice = Math.round(min);
  const minTrade = Math.round(minPrice / 1.3);
  const maxTrade = Math.round(maxPrice / 1.5);
  const soldYearItem = NumberOfSales(soldItems);
  const roundedSoldItems = Math.round(Number(soldYearItem));
  const percentPremium = roundedSoldItems > 80000 ? "1%" : "-";

  const HistoricalArr = [
    {
      value: `€${minPrice} - €${maxPrice}`,
      title: "12-Month Trade Range",
    },
    {
      value: `€${minTrade} - €${maxTrade}`,
      title: "All-Time Trade Range",
    },
    {
      value: "13%",
      title: "Volatility",
    },
    {
      value: roundedSoldItems,
      title: "Number of Sales",
    },
    {
      value: percentPremium,
      title: "Price Premium",
    },
    {
      value: `€${avgPrice}`,
      title: "Average Sale Price",
    },
  ];

  return (
    <div className="border-{#a4a4a4} mb-10 border-b">
      <h1 className="mb-5 text-xl">12-Month Historical</h1>
      <div className="mb-5 grid grid-cols-3 gap-5">
        {HistoricalArr.map((obj, id) => (
          <div key={id} className="w-full rounded-lg bg-[#f4f3f1] px-6 py-2">
            <h2 className="text-xl font-bold">{obj.value}</h2>{" "}
            <p className="font-extralight">{obj.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthHistoricalBlock;
