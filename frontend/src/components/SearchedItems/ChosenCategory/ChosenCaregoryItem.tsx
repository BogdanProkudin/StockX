type ChosenCategoryItemProps = {
  categoryName: string;
};
const ChosenCategoryItem: React.FC<ChosenCategoryItemProps> = ({
  categoryName,
}) => {
  return (
    <button className="bg-categoryButtonColor text-text-primary mb-1 mr-1 mt-1 inline-flex h-[30px] min-h-[22px] min-w-[20px] max-w-full cursor-pointer items-center justify-center rounded-2xl px-2 py-2 pl-3 pr-3 align-top font-sans text-sm text-xs font-normal leading-tight shadow outline-2 outline-offset-2">
      <span className="text-blackTextColor text-center text-sm">
        {categoryName}
      </span>
    </button>
  );
};

export default ChosenCategoryItem;