import React from "react";

interface ProfileCardProps {
  title: string;
  img: string;
  price: number;
  size: string;
  brand?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  title,
  img,
  price,
  size,
  brand,
}) => {
  return (
    <div className="flex w-full items-center justify-between border-b border-[#cacaca]">
      <div className="flex items-center gap-5">
        <img className="h-20 w-20 object-contain" src={img} alt="" />
        <div className="max-w-[280px]">
          <span className="text-[#969696]">{brand}</span>
          <h4 className="overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </h4>
          <p className="text-[#969696]">Size: {size}</p>
        </div>
      </div>
      <p>{size}</p>
      <div>€{price}</div>
    </div>
  );
};

export default ProfileCard;
