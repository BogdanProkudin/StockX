const SearchedItem = () => {
  return (
    <div className="flex w-full cursor-pointer items-center border-b-2 border-b-lightGray transition-all duration-100 hover:border-r-green-900">
      <img
        className="m-5 h-28 w-32"
        src="https://images.stockx.com/images/Balenciaga-XX-Flap-Bag-S-Pink-V1.jpg?fit=fill&bg=FFFFFF&w=140&h=100&fm=webp&auto=compress&q=90&dpr=2&trim=color&trimcolor=ffffff&updated_at=1726620315"
      />
      <div className="flex flex-col">
        <div className="text-[12px] uppercase leading-3">Balenciaga</div>
        <div className="text-lg font-bold uppercase leading-5 text-black">
          Balenciaga XX Flap Bag
        </div>
        <div className="m-0 text-[14px] font-bold uppercase leading-5">
          S Pink
        </div>
      </div>
    </div>
  );
};

export default SearchedItem;
