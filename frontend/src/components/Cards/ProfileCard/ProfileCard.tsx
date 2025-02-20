import React from "react";

interface ProfileCardProps {
  title: string;
  img: string;
  price: number;
  size: string;
  brand?: string;
  addedAt: number;
  status: string;
  sku: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  title,
  img,
  price,
  size,
  brand,
  addedAt,
  status,
  sku,
}) => {
  const dataPurchased = String(addedAt).split("T")[0];
  return (
    <div className="flex w-full items-center justify-between border-b border-[#cacaca]">
      <div className="flex items-center gap-5">
        <img className="h-20 w-20 object-contain" src={img} alt="" />
        <div className="min-w-[280px] max-w-[280px]">
          <span className="text-[#969696]">{brand}</span>
          <h4 className="overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </h4>
          <p className="text-[#969696]">Size: {size}</p>
        </div>
      </div>
      <p>{sku}</p>
      <div>€{price}</div>
      <p>{dataPurchased}</p>
      <p className="mr-5">{status}</p>
    </div>
  );
};

export default ProfileCard;
