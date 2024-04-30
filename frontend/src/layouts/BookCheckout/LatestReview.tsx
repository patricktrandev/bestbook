import React from "react";
import ReviewModel from "../../models/ReviewModel";
import { Link } from "react-router-dom";
import { Review } from "../Utils/Review";

export const LatestReview: React.FC<{
  reviews: ReviewModel[];
  bookId: number | undefined;
  mobile: boolean;
}> = (props) => {
  let { reviews, bookId, mobile } = props;
  return (
    <div className={mobile ? "mt-3" : "row mt-5"}>
      <div className={mobile ? "" : "col-sm-2 col-md-2"}>
        <h4>Latest Reviews </h4>
      </div>
      <div className="col-sm-10 col-md-10">
        {reviews?.length > 0 ? (
          <>
            {reviews?.slice(0, 3).map((rev) => (
              <Review review={rev} key={rev.id} />
            ))}
            <div className="m-3">
              <Link to="/" type="button" className="btn btn-primary btn-md">
                Reach All Reviews
              </Link>
            </div>
          </>
        ) : (
          <div className="m-3">
            <p className="lead">Currently there are no reviews for this book</p>
          </div>
        )}
      </div>
    </div>
  );
};
