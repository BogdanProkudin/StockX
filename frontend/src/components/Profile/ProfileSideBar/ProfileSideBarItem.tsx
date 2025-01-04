import clsx from "clsx";

interface ProfileSideBarItemProps {
  title: string;
  icon: string;
  description: string;
  handleSelectTab: (name: string) => void;
  activeTab: string;
}

const ProfileSideBarItem = ({
  title,
  icon,
  description,
  handleSelectTab,
  activeTab,
}: ProfileSideBarItemProps) => {
  console.log(activeTab, title);

  return (
    <div
      onClick={() => handleSelectTab(title)}
      className={clsx(
        "flex h-[75px] cursor-pointer justify-between p-[16px] pl-4 hover:bg-[#F2F2F2]",
        {
          "bg-green-300": activeTab === title,
          "hover:bg-green-300": activeTab === title,
        },
      )}
    >
      <div className="mt-1 flex h-[60px]"> {icon}</div>

      <div className="ml-4 flex w-full flex-col justify-center">
        <div className="text-[0.875rem] font-bold text-[#242424]">{title}</div>
        {description.length > 0 && (
          <div className="whitespace-pre-wrap text-[12px] text-[#6B6B6B]">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSideBarItem;
