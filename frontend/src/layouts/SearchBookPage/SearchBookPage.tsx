import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./component/SearchBook";
import { Pagination } from "../Utils/Pagination";

export const SearchBookPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchBook = async () => {
      const baseUrl = "http://localhost:8080/api/books";
      const url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      const res = await fetch(url);
      console.log(res);
      if (!res.ok) console.log("Something went wrong!");

      const resJson = await res.json();
      console.log(resJson);
      const resData = resJson._embedded.books;
      setTotalAmountOfBooks(resJson.page.totalElements);
      setTotalPages(resJson.page.totalPages);

      const loadedBook: BookModel[] = [];

      for (const b in resData) {
        loadedBook.push({
          id: resData[b].id,
          title: resData[b].title,
          description: resData[b].description,
          copies: resData[b].copies,
          copiesAvailable: resData[b].copiesAvailable,
          category: resData[b].category,
          img: resData[b].img,
        });
      }

      setBooks(loadedBook);
      setLoading(false);
    };

    fetchBook().catch((err: any) => {
      setLoading(false);
      setHttpError(err.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage]);
  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }
  console.log("here", books);
  const indexOfLastBookInCurrentPage: number = currentPage * booksPerPage;
  const indexOfFirstBookInCurrentPage: number =
    indexOfLastBookInCurrentPage - booksPerPage;
  let lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-6">
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search book title, category,..."
              aria-labelledby="Search"
            />
            <button className="btn btn-outline-success">Search</button>
          </div>
        </div>
        <div className="col-4">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Category
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  All
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Front End
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Back End
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Data
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  DevOps
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h5>Number of results: {totalAmountOfBooks}</h5>
      </div>
      <p>
        {indexOfFirstBookInCurrentPage + 1} to{" "}
        {indexOfLastBookInCurrentPage > totalAmountOfBooks
          ? totalAmountOfBooks
          : indexOfLastBookInCurrentPage}{" "}
        of {totalAmountOfBooks} items
      </p>
      {books.map((b) => (
        <SearchBook book={b} key={b.id} />
      ))}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
