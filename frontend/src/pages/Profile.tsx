import React from "react";
import ProfileSideBar from "../components/Profile/ProfileSideBar/ProfileSideBar";
import ProfileDetails from "../components/Profile/ProfileDetails/ProfileDetails";
import { useLocation } from "react-router-dom";
import ProfileSelling from "../components/Profile/ProfileSelling/ProfileSelling";
import { useGetUserDataQuery } from "../redux/api/mainApiSlice";
import ProfileBuying from "../components/Profile/ProfileBuying/ProfileBuying";

const Profile = () => {
  const location = useLocation();
  const path = location.pathname;
  const activeProfileTab = path.split("/")[1];

  return (
    <div className="flex">
      {activeProfileTab === "profile" && <ProfileDetails />}
      {activeProfileTab === "selling" && <ProfileSelling />}
      {activeProfileTab === "buying" && <ProfileBuying />}
    </div>
  );
};

export default Profile;
