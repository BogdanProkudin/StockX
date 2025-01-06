import React, { useEffect } from "react";
import ProfileSideBar from "../components/Profile/ProfileSideBar/ProfileSideBar";
import ProfileDetails from "../components/Profile/ProfileDetails/ProfileDetails";
import { useLocation } from "react-router-dom";
import ProfileSelling from "../components/Profile/ProfileSelling/ProfileSelling";
import { useGetUserDataQuery } from "../redux/api/mainApiSlice";

const Profile = () => {
  const [activeTab, setActiveTab] = React.useState("");
  const location = useLocation();
  const path = location.pathname;
  const activeProfileTab = path.split("/")[1];

  return (
    <div className="flex">
      <ProfileSideBar setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeProfileTab === "profile" && <ProfileDetails />}
      {activeProfileTab === "selling" && <ProfileSelling />}
    </div>
  );
};

export default Profile;
