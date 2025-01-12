import React from "react";

interface ProfileCardProps {
  title: string;
  img: string;
  price: number;
  size: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  title,
  img,
  price,
  size,
}) => {
  return (
    <div className="flex w-full items-center justify-between border-b border-[#cacaca]">
      <div className="flex items-center gap-5">
        <img className="h-20 w-20" src={img} alt="" />
        <h4>{title}</h4>
      </div>
      <p>{size}</p>
      <div>{price}</div>
    </div>
  );
};

export default ProfileCard;
