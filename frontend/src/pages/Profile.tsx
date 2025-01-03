import React from "react";
import ProfileSideBar from "../components/Profile/ProfileSideBar/ProfileSideBar";
import ProfileDetails from "../components/Profile/ProfileDetails/ProfileDetails";

const Profile = () => {
  return (
    <div className="flex">
      <ProfileSideBar />
      <ProfileDetails />
    </div>
  );
};

export default Profile;
