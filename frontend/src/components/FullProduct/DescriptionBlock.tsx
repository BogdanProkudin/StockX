import React from "react";

interface DescriptionBlockProps {
  description: string;
  gender: string;
  color: string;
  sku: string;
  date: string | null;
}
const DescriptionBlock: React.FC<DescriptionBlockProps> = ({
  description,
  gender,
  color,
  date,
  sku,
}) => {
  console.log(date);
  const fakeDate = "2024";
  const desArr = [
    {
      title: "Gender: ",
      subTitle: gender.charAt(0).toUpperCase() + gender.slice(1),
    },
    {
      title: "Color: ",
      subTitle: color,
    },
    {
      title: "SKU: ",
      subTitle: sku,
    },
    date
      ? {
          title: "Release Date: ",
          subTitle: date,
        }
      : null,
  ].filter((item) => item !== null);
  return (
    <div className="border-{#a4a4a4} mb-10 border-b">
      <h1 className="mb-4 text-xl font-bold">Product Details</h1>
      <ul className="flex max-h-[200px] justify-between overflow-hidden">
        <div className="w-[350px]">
          {desArr.map((obj, id) => (
            <li className="mb-2 flex items-center justify-between" key={id}>
              <span className="font-bold">{obj.title}</span>
              {obj.subTitle}
            </li>
          ))}
        </div>
        <div className="max-w-[700px]">
          <span>Description:</span>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </ul>
      <div className="mb-2 mt-5 flex w-full justify-center">
        <button className="">Read More</button>
      </div>
    </div>
  );
};

export default DescriptionBlock;
