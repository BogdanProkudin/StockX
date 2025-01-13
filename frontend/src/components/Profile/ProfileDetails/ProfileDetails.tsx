import ProfileHeader from "./PersonalInformation/PesonalInfornationHeader";
import ProfileInformationSection from "./PersonalInformation/PersonInformationSection";
import ShippingHeader from "./ShippingInformation/ShippingInformationHeader";
import ShippingInformationSection from "./ShippingInformation/ShippingInformationSection";

const ProfileDetails = () => {
  return (
    <div className="w-full max-w-[1200px] p-16 pt-6">
      <h1 className="text-2xl font-bold text-[#242424]">Profile</h1>
      <ProfileHeader />
      <ProfileInformationSection />
      <ShippingHeader />
      <ShippingInformationSection />
    </div>
  );
};
export default ProfileDetails;
