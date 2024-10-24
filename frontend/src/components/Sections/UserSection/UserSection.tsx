import React from "react";
import UserCard from "../../Cards/UserCard/UserCard";
import axios from "../../../axiosConfig/axios";
import { userCardProps } from "../../../@types/userCardTypes";
const UserSection = () => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    async function FetchSneakers() {
      setIsLoading(true);
      try {
        const res = await axios.get("/getShoes");
        setData(res.data.hits);
        setIsLoading(false);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    }
    FetchSneakers();
    setIsLoading(false);
  }, []);
  console.log(data);

  return (
    <div className="mb-30">
      <div className="my-5 flex gap-4">
        <h2 className=" font-bold text-xl ">Recommended For You</h2>
        <span>?</span>
      </div>

      <div className="flex justify-between">
        {isLoading
          ? "Loading..."
          : data
              .slice(0, 6)
              .map((obj: userCardProps, id: number) => (
                <UserCard key={id} {...obj} />
              ))}
      </div>
    </div>
  );
};

export default UserSection;
