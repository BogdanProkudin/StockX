import { profileArr } from "../../../assets/HeaderAssets/HeaderUserAction";
import ProfileSideBarItem from "./ProfileSideBarItem";

const ProfileSideBar = () => {
  return (
    <div className="flex h-full w-[260px] flex-col bg-[#FAFAFA] p-4">
      <div className="mb-[2rem] w-[250px] overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold text-[#242424]">
        Прокудин Богдан wwwwwwwwwww
      </div>
      <div className="flex flex-col">
        {profileArr.map((item, id) => (
          <ProfileSideBarItem
            key={id}
            title={item.name}
            icon={item.img}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileSideBar;
