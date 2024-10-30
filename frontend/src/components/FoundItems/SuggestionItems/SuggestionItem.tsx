const SuggestionItem = ({ name }: { name: string }) => {
  return (
    <div
      className="flex justify-between items-center cursor-pointer border-b-2 border-b-lightGray 
      p-4 h-14 
            hover:border-r-[10px] hover:border-r-green-900 
            transition-all duration-100  w-full"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <span className=" flex justify-center items-center">
        <b className=" text-lg">10000</b>
        <b className="text-lg pr-0.5">+ </b>
        result found in <b className="text-lg pl-1">{name}</b>
      </span>
    </div>
  );
};

export default SuggestionItem;
