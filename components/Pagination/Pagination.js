import React from "react";
import { usePagination } from "./usePagination";
import styles from "../../styles/Home.module.css";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="d-flex gap-3 justify-content-center p-2 m-3 rounded flex-wrap">
      <span
        className={`btn rounded-pill ${
          1 === currentPage ? "d-none pe-none" : ""
        }`}
        onClick={onPrevious}
      >
        &lt;&nbsp;Previous
      </span>
      {paginationRange.map((pageIndex) => {
        return (
          <span
            className={`d-flex align-items-center p-2 px-3 rounded-circle  ${
              styles.hoverCursor
            } ${
              pageIndex === currentPage ? "bg-primary text-light pe-none" : ""
            }`}
            onClick={() => onPageChange(pageIndex)}
            key={`pg${pageIndex}`}
          >
            {pageIndex}
          </span>
        );
      })}
      <span
        className={`btn rounded-pill  ${styles.hoverCursor} ${
          lastPage === currentPage ? "d-none pe-none" : ""
        }`}
        onClick={onNext}
      >
        Next&nbsp;&gt;
      </span>
    </div>
  );
};

export default Pagination;
