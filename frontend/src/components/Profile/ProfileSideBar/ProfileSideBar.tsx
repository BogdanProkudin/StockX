import { useNavigate, useSearchParams } from "react-router-dom";
import { profileArr } from "../../../assets/HeaderAssets/HeaderUserAction";
import ProfileSideBarItem from "./ProfileSideBarItem";

const ProfileSideBar = ({
  setActiveTab,
  activeTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
}) => {
  const navigate = useNavigate();
  const handleSelectTab = (name: string) => {
    setActiveTab(name.toLowerCase());
    navigate(`/${name.toLowerCase()}`);
  };
  return (
    <div>
      <div className="flex h-full w-[260px] flex-col bg-[#FAFAFA] p-4 pl-0 pr-0">
        <div className="mb-[2rem] ml-[1rem] w-[250px] overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold text-[#242424]">
          Прокудин Богдан wwwwwwwwwww
        </div>
        <div className="flex flex-col">
          {profileArr.map((item, id) => (
            <ProfileSideBarItem
              handleSelectTab={handleSelectTab}
              activeTab={activeTab}
              key={id}
              title={item.name}
              icon={item.img}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
