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
  const [searchKey, setSearchKey] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] = useState("Book Category");
  useEffect(() => {
    const fetchBook = async () => {
      const baseUrl = "http://localhost:8080/api/books";
      let url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace(
          "<pageNumber>",
          `${currentPage}-1`
        );
        url = baseUrl + searchWithPage;
      }

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
  }, [currentPage, searchUrl]);
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

  const handleSearchChange = () => {
    setCurrentPage(1);
    //console.log(searchKey);
    if (searchKey === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${searchKey}&page=<pageNumber>&size=${booksPerPage}`
      );
      //console.log(searchUrl);
    }
    setCategorySelection("Book Category");
  };

  const handleClearKeySearch = () => {
    setSearchKey("");
    setSearchUrl("");
    setCurrentPage(1);
    setCategorySelection("Book Category");
  };

  const handleSearchCategory = (value: string) => {
    if (
      value.toLowerCase() === "fe" ||
      value.toLowerCase() === "be" ||
      value.toLowerCase() === "data" ||
      value.toLowerCase() === "devops"
    ) {
      setCategorySelection(value);
      setSearchUrl(
        `/search/findByCategory?category=${value.toLowerCase()}&page=<pageNumber>&size=${booksPerPage}`
      );
    } else {
      setCategorySelection("All");
      setSearchUrl("");
    }
  };

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
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button
              className="btn btn-outline-success"
              onClick={() => handleSearchChange()}
            >
              Search
            </button>
            <button
              className="btn btn-outline-warning mx-2"
              onClick={() => handleClearKeySearch()}
            >
              Clear
            </button>
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
              {categorySelection}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li onClick={() => handleSearchCategory("All")}>
                <a className="dropdown-item" href="#">
                  All
                </a>
              </li>
              <li onClick={() => handleSearchCategory("FE")}>
                <a className="dropdown-item" href="#">
                  Front End
                </a>
              </li>
              <li onClick={() => handleSearchCategory("BE")}>
                <a className="dropdown-item" href="#">
                  Back End
                </a>
              </li>
              <li onClick={() => handleSearchCategory("Data")}>
                <a className="dropdown-item" href="#">
                  Data
                </a>
              </li>
              <li onClick={() => handleSearchCategory("Devops")}>
                <a className="dropdown-item" href="#">
                  DevOps
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {totalAmountOfBooks > 0 ? (
        <>
          <div className="mt-3">
            <h5>Number of results: {totalAmountOfBooks}</h5>
          </div>
          <p>
            {`${
              indexOfFirstBookInCurrentPage >= totalAmountOfBooks
                ? ` 1 `
                : indexOfFirstBookInCurrentPage + 1
            } `}
            to{" "}
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
        </>
      ) : (
        <div className="m-5">
          <h3>Can't find what you're looking for?</h3>
          <a href="#" className="btn btn-primary px-4 me-md-2 fw-bold ">
            Library Services
          </a>
        </div>
      )}
    </div>
  );
};
