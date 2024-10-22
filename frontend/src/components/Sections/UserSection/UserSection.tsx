import React from "react";
import UserCard from "../../Cards/UserCard/UserCard";
import axios from "../../../axiosConfig/axios";
const UserSection = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    async function FetchSneakers() {
      try {
        setIsLoading(true);
        const res = await axios.get("/getShoes");
        setData(res.data.hits);
        setIsLoading(false);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    }
    FetchSneakers();
  }, []);
  console.log(data);

  return (
    <div>
      <div className="my-5 flex gap-4">
        <h2 className=" font-bold text-xl ">Recommended For You</h2>
        <span>?</span>
      </div>

      <div className="flex gap-3">
        {" "}
        {/* {data.slice(0, 6).map((obj, id) => (
          <UserCard key={id} />
        ))} */}
      </div>
    </div>
  );
};

export default UserSection;
