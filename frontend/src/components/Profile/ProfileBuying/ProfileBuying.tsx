import React from "react";
import TopNavigation from "./TopNavigation";
import { Search } from "lucide-react";

const ProfileBuying = () => {
  return (
    <div className="profileContainer">
      <TopNavigation />
      <div className="relative">
        <input
          className="w-full rounded-md border border-[#a4a4a4] px-4 py-3 pl-10 text-lg outline-none"
          type="text"
          placeholder="Search name"
        />
        <Search size={20} className="absolute left-2 top-4" />
      </div>
    </div>
  );
};

export default ProfileBuying;
