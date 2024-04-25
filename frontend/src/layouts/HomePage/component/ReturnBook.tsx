import React from "react";

export default function ReturnBook() {
  return (
    <>
      <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
        <div className="text-center">
          <img
            src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
            width="151"
            height="233"
            alt="book-luv2code-1000"
          />
          <h6 className="mt-2">Book</h6>
          <p>Luv2Code</p>
          <a type="button" className="btn btn-primary" href="#">
            Reserve
          </a>
        </div>
      </div>
    </>
  );
}
