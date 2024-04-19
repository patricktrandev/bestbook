import React from "react";
import { Carousel } from "react-bootstrap";
import ReturnBook from "./ReturnBook";
export default function BookCarousel() {
  return (
    <div>
      <Carousel
        className="container mt-5"
        style={{ height: "400px" }}
        data-bs-theme="dark"
      >
        <Carousel.Item>
          <div className="row d-flex justify-content-center align-items-center">
            <ReturnBook />
            <ReturnBook />
            <ReturnBook />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="row d-flex justify-content-center align-items-center">
            <ReturnBook />
            <ReturnBook />
            <ReturnBook />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="row d-flex justify-content-center align-items-center">
            <ReturnBook />
            <ReturnBook />
            <ReturnBook />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
