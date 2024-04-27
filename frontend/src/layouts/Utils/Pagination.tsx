import React from "react";

export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  paginate: any;
}> = (props) => {
  const pageNumbers: number[] = [];
  if (props.currentPage === 1) {
    pageNumbers.push(props.currentPage);
    if (props.totalPages >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPages >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  } else if (props.currentPage > 1) {
    if (props.totalPages >= 3) {
      if (props.currentPage != 2) {
        pageNumbers.push(props.currentPage - 2);
      }
      pageNumbers.push(props.currentPage - 1);
    } else {
      pageNumbers.push(props.currentPage - 1);
    }

    pageNumbers.push(props.currentPage);
    if (props.totalPages >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPages >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  }

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item " onClick={() => props.paginate(1)}>
          <span className="page-link">First</span>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => props.paginate(number)}
            className={`page-item ${
              props.currentPage === number ? "active" : ""
            }`}
          >
            <span className="page-link">{number}</span>
          </li>
        ))}

        <li
          className="page-item "
          onClick={() => props.paginate(props.totalPages)}
        >
          <span className="page-link">Last</span>
        </li>
      </ul>
    </nav>
  );
};
