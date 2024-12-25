import Review from "../../assets/images/Surfacing_Reviews_Landing_Page_on_PDPSurfacing_Reviews_Landing_Page_on_PDP-refresh-1.webp";
const ReviewBlock = () => {
  return (
    <div className="border-{#a4a4a4} mb-5 flex flex-col items-center justify-center border-b">
      <h1 className="mb-1 text-center text-4xl font-bold">
        StockX Ratings & Reviews
      </h1>
      <h3 className="mb-1 text-center text-xl">
        See What Our Customers Have To Say
      </h3>
      <img
        className="mb-5 h-[368px] w-[638px] cursor-pointer rounded-xl"
        src={Review}
        alt="Review"
      />
    </div>
  );
};

export default ReviewBlock;
