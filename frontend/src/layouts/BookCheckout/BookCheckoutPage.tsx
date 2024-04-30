import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";

import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarReviews } from "../Utils/StarReviews";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";

export const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const bookId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchSingleBook = async () => {
      const baseUrl = `http://localhost:8080/api/books/${bookId}`;

      const res = await fetch(baseUrl);
      //console.log(res);
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const resJson = await res.json();
      //console.log(resJson);

      const loadedBook: BookModel = {
        id: resJson.id,
        author: resJson.author,
        category: resJson.category,
        copies: resJson.copies,
        copiesAvailable: resJson.copiesAvailable,
        description: resJson.description,
        img: resJson.img,
        title: resJson.title,
      };
      setBook(loadedBook);
      setIsLoading(false);
    };

    fetchSingleBook().catch((err: any) => {
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
  //console.log(book);
  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book?.img} alt="Book" width="226" height="349" />
            ) : (
              <img
                src={require("../../Images/BooksImages/book-luv2code-1000.png")}
                alt="Book"
                width="226"
                height="349"
              />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h3>{book?.title}</h3>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead" style={{ fontSize: "1.1rem" }}>
                {book?.description}
              </p>
              <StarReviews rating={3} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox book={book} mobile={false} />
        </div>
        <hr />
      </div>
      {/*mobile*/}
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {book?.img ? (
            <img src={book?.img} alt="Book" width="226" height="349" />
          ) : (
            <img
              src={require("../../Images/BooksImages/book-luv2code-1000.png")}
              alt="Book"
              width="226"
              height="349"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p style={{ fontSize: "0.9rem" }} className="lead">
              {book?.description}
            </p>
            <StarReviews rating={3} size={22} />
          </div>
        </div>
        <CheckoutAndReviewBox book={book} mobile={true} />
        <hr />
      </div>
    </div>
  );
};
