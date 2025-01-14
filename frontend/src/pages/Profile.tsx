import ProfileDetails from "../components/Profile/ProfileDetails/ProfileDetails";
import { useLocation } from "react-router-dom";
import ProfileSelling from "../components/Profile/ProfileSelling/ProfileSelling";

import ProfileBuying from "../components/Profile/ProfileBuying/ProfileBuying";

const Profile = () => {
  const location = useLocation();
  const path = location.pathname;
  const activeProfileTab = path.split("/")[1];

  return (
    <div className="flex w-full">
      {activeProfileTab === "profile" && <ProfileDetails />}
      {activeProfileTab === "selling" && <ProfileSelling />}
      {activeProfileTab === "buying" && <ProfileBuying />}
    </div>
  );
};

export default Profile;
