import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

import BookModel from "../../../models/BookModel";
import { ReturnBook } from "./ReturnBook";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
export default function BookCarousel() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:8080/api/books";
      const url: string = `${baseUrl}?page=0&size=9`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;
      const loadedBook: BookModel[] = [];
      for (const b in responseData) {
        loadedBook.push({
          id: responseData[b].id,
          title: responseData[b].title,
          description: responseData[b].description,
          copies: responseData[b].copies,
          copiesAvailable: responseData[b].copiesAvailable,
          category: responseData[b].category,
          img: responseData[b].img,
        });
      }
      setBooks(loadedBook);
      setIsLoading(false);

      window
        .matchMedia("(min-width: 768px)")
        .addEventListener("change", (e) => setMatches(e.matches));
    };
    fetchBooks().catch((err: any) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, []);

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

  return (
    <div>
      {matches ? (
        <Carousel
          className="container mt-5"
          style={{ height: "400px" }}
          data-bs-theme="dark"
        >
          <Carousel.Item>
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(0, 3).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(3, 6).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(6, 9).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </Carousel.Item>
        </Carousel>
      ) : (
        <div className="d-lg-none mt-3">
          <div className="row d-flex justify-content-center align-items-center">
            <ReturnBook book={books[7]} key={books[7].id} />
          </div>
        </div>
      )}
      <div className="homepage-carousel-title mt-3">
        <Link
          type="button"
          className="btn btn-outline-secondary btn-lg"
          to="/search"
        >
          View more
        </Link>
      </div>
    </div>
  );
}
