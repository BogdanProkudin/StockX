import ReactPaginate from "react-paginate";
import styles from "./styles.module.scss";

const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: {
  pageCount: number;
  currentPage: number;
  onPageChange: { (selectedItem: { selected: number }): void };
}) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange({ selected: selectedItem.selected + 1 });
  };

  return (
    <ReactPaginate
      previousLabel={"← Previous"}
      nextLabel={"Next →"}
      breakLabel={"..."}
      marginPagesDisplayed={0}
      pageRangeDisplayed={3}
      forcePage={0}
      initialPage={currentPage - 1}
      pageCount={pageCount - 1}
      pageClassName={styles.pageItem}
      pageLinkClassName={styles.pageLink}
      previousClassName={styles.previousButton}
      previousLinkClassName={styles.previousButtonLink}
      nextClassName={styles.nextButton}
      nextLinkClassName={styles.nextButtonLink}
      onPageChange={handlePageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
