import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/settings/profile");
  };
  return (
    <div className="flex w-full items-center justify-between border-b-2 border-E2E8F0 pb-2 pt-4">
      <h1 className="text-xl font-bold text-[#242424]">Personal Information</h1>
      <button
        onClick={handleEdit}
        className="border-brand-secondary text-brand-secondary relative inline-flex h-[36px] min-w-[auto] select-none appearance-none items-center justify-center whitespace-nowrap rounded-full border bg-transparent px-4 py-4 align-middle text-sm font-semibold normal-case leading-[1.25] outline-[2px] outline-offset-2 outline-transparent transition duration-150 hover:bg-black hover:text-white"
      >
        Edit
      </button>
    </div>
  );
};
export default ProfileHeader;
