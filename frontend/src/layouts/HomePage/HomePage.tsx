import React from "react";
import ExploreTopBook from "./component/ExploreTopBook";

import Heroes from "./component/Heroes";
import LibraryServices from "./component/LibraryServices";
import BookCarousel from "./component/BookCarousel";

export default function HomePage() {
  return (
    <>
      <ExploreTopBook />
      <BookCarousel />
      <Heroes />
      <LibraryServices />
    </>
  );
}
