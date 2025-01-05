import { useAppSelector } from "../../../../redux/hook";

const PersonalInformationSection = () => {
  const userData = useAppSelector((state) => state.profileSlice.userData);
  if (!userData) {
    return null;
  }
  const sectionNames = [
    { title: "Name", value: `${userData.firstName} ${userData.secondName}` },
    { title: "Shoe Size" },
    { title: "Email Address", value: userData.email },
    { title: "Username", value: userData.userName },
  ];
  return (
    <div className="mt-5 flex h-[200px] w-full max-w-[955px] flex-wrap justify-between">
      {sectionNames.map((item, id) => (
        <div key={id} className="flex w-60 flex-col">
          <span className="text-lg font-bold text-[#242424]">{item.title}</span>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
};
export default PersonalInformationSection;
