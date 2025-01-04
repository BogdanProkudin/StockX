const PersonalInformationSection = () => {
  const sectionNames = ["Name", "Shoe Size", "Email Address", "Username"];
  return (
    <div className="flex h-[200px] w-full max-w-[1050px] flex-wrap justify-between bg-red-400">
      {sectionNames.map((item, id) => (
        <div key={id} className="flex w-60 flex-col">
          <span>{item}</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
};
export default PersonalInformationSection;
