import React from "react";
import { IimageProps } from "../../../redux/slices/homeItemsSlice";
import { Link } from "react-router-dom";
import CardSkeleton from "./Skeleton";
interface iCardProps {
  data: IimageProps[];
}
const CardSection: React.FC<iCardProps> = ({ data }) => {
  return (
    <div className="mb-10 mt-5 flex gap-5 largeScreen:ml-3 largeScreen:mr-3">
      {data.length < 1 ? (
        <CardSkeleton />
      ) : (
        <>
          {data.map((obj: IimageProps, id: number) => (
            <Link to={obj.path} key={id}>
              <img
                className="cursor-pointer rounded-2xl"
                src={obj.img}
                alt={obj.alt}
              />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default CardSection;
