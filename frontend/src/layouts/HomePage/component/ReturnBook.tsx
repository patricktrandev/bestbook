import React from "react";
import BookModel from "../../../models/BookModel";
import { decode as base64_decode } from "base-64";
export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <>
      <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
        <div className="text-center">
          {props.book.img ? (
            <img
              src={`${props.book.img}`}
              width="151"
              height="233"
              alt="book-luv2code-1000"
            />
          ) : (
            <img
              src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
              width="151"
              height="233"
              alt="book-luv2code-1000"
            />
          )}

          <h6 className="mt-2">{props.book.title}</h6>
          <p>{props.book.author}</p>
          <a type="button" className="btn btn-primary" href="#">
            Reserve
          </a>
        </div>
      </div>
    </>
  );
};
