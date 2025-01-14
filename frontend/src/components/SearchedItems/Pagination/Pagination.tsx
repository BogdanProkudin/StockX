import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const visibleRange = currentPage > 3 ? 1 : 3;
  const startPage = Math.max(1, currentPage - visibleRange);
  const endPage = Math.min(
    pageCount,
    currentPage > 3 ? currentPage + visibleRange : 4,
  );

  const handlePageChange = (selected: number) => {
    if (selected < 1 || selected > pageCount) return;
    onPageChange(selected);
  };

  const pagesForView = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const buttonBaseStyle =
    "h-8 w-8 rounded-full flex items-center justify-center  text-sm font-medium transition-colors duration-200";
  const activeButtonStyle =
    "bg-[#08a05c]  rounded-full text-white hover:bg-[#08a05c]/90";
  const inactiveButtonStyle = "text-gray-700 hover:bg-[#08a05c]/10";
  const disabledButtonStyle =
    "text-gray-400 cursor-not-allowed hover:bg-transparent";
  const navButtonStyle = "min-w-[40px]";

  return (
    <div className="mediumScreen:mb-4 mb-4 flex items-center gap-2">
      <NavigateNextIcon
        style={{ transform: "rotate(180deg)" }}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`${buttonBaseStyle} ${navButtonStyle} ${currentPage === 1 ? disabledButtonStyle : inactiveButtonStyle}`}
      />

      {currentPage > 3 && (
        <>
          <button
            className={`${buttonBaseStyle} ${inactiveButtonStyle}`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          <span className="text-gray-400">...</span>
        </>
      )}
      {pagesForView.map((el) => (
        <button
          key={el}
          className={`${buttonBaseStyle} ${el === currentPage ? activeButtonStyle : inactiveButtonStyle}`}
          onClick={() => handlePageChange(el)}
        >
          {el}
        </button>
      ))}
      {currentPage < pageCount - 2 && (
        <>
          <span className="text-gray-400">...</span>
          <button
            className={`${buttonBaseStyle} ${inactiveButtonStyle}`}
            onClick={() => handlePageChange(pageCount)}
          >
            {pageCount}
          </button>
        </>
      )}
      <NavigateNextIcon
        onClick={() => handlePageChange(currentPage + 1)}
        className={`${buttonBaseStyle} ${navButtonStyle} ${currentPage === pageCount ? disabledButtonStyle : inactiveButtonStyle}`}
      />
    </div>
  );
};

export default Pagination;
