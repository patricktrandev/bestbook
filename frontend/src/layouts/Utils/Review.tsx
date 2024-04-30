import React from "react";
import ReviewModel from "../../models/ReviewModel";
import { StarReviews } from "./StarReviews";

export const Review: React.FC<{ review: ReviewModel }> = (props) => {
  const date = new Date(props.review.date);
  const { userEmail, rating, reviewDescription } = props.review;
  const longMonth = date.toLocaleString("en-us", { month: "long" });
  const dateDay = date.getDate();
  const dateYear = date.getFullYear();

  const dateRender = longMonth + " " + dateDay + ", " + dateYear;
  return (
    <div>
      <div className="col-sm-8 col-md-8">
        <h5>{userEmail}</h5>
        <div className="row">
          <div className="col">{dateRender}</div>
          <div className="col">
            <StarReviews rating={rating} size={16} />
          </div>
        </div>
        <div className="mt-2">
          <p>{reviewDescription}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};
