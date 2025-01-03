interface ProfileSideBarItemProps {
  title: string;
  icon: string;
  description: string;
}

const ProfileSideBarItem = ({
  title,
  icon,
  description,
}: ProfileSideBarItemProps) => {
  return (
    <div className="flex h-[75px] cursor-pointer justify-between p-[16px] pl-[0px] hover:bg-[#F2F2F2]">
      <div className="flex h-[60px]"> {icon}</div>

      <div className="ml-4 flex w-full flex-col justify-center">
        <div className="text-[0.875rem] font-bold text-[#242424]">{title}</div>
        <div className="whitespace-pre-wrap text-[12px] text-[#6B6B6B]">
          {description}
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBarItem;
