const PersonalInformationSection = () => {
  const sectionNames = [
    { title: "Name" },
    { title: "Shoe Size" },
    { title: "Email Address" },
    { title: "Username" },
  ];
  return (
    <div className="mt-5 flex h-[200px] w-full max-w-[955px] flex-wrap justify-between">
      {sectionNames.map((item, id) => (
        <div key={id} className="flex w-60 flex-col">
          <span className="text-lg font-bold text-[#242424]">{item.title}</span>
          <span>{"prokudinbogdan@gmail.com"}</span>
        </div>
      ))}
    </div>
  );
};
export default PersonalInformationSection;
