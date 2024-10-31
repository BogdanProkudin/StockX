const SearchedItem = () => {
  return (
    <div className=" flex items-center w-full border-b-2 cursor-pointer border-b-lightGray   hover:border-r-[8px] hover:border-r-green-900 transition-all duration-100   ">
      <img
        className=" w-32 h-28 m-5"
        src="https://images.stockx.com/images/Balenciaga-XX-Flap-Bag-S-Pink-V1.jpg?fit=fill&bg=FFFFFF&w=140&h=100&fm=webp&auto=compress&q=90&dpr=2&trim=color&trimcolor=ffffff&updated_at=1726620315"
      />
      <div className=" flex flex-col">
        <div className="uppercase text-[12px] leading-3">Balenciaga</div>
        <div className=" uppercase  font-bold text-black leading-5 text-lg">
          Balenciaga XX Flap Bag
        </div>
        <div className=" text-[14px] uppercase leading-5 font-bold m-0">
          S Pink
        </div>
      </div>
    </div>
  );
};

export default SearchedItem;
