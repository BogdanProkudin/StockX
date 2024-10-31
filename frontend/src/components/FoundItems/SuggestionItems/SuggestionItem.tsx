const SuggestionItem = ({ name }: { name: string }) => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <span className="flex items-center justify-center">
        <b className="text-lg">10000</b>
        <b className="pr-0.5 text-lg">+ </b>
        result found in <b className="pl-1 text-lg">{name}</b>
      </span>
    </>
  );
};

export default SuggestionItem;
