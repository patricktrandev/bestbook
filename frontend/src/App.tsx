import React from "react";

import "./App.css";
import Navbar from "./layouts/NavbarAndFooter/Navbar";
import ExploreTopBook from "./layouts/HomePage/ExploreTopBook";
import Carousel from "./layouts/HomePage/Carousel";
import Heroes from "./layouts/HomePage/Heroes";
import LibraryServices from "./layouts/HomePage/LibraryServices";

function App() {
  return (
    <div>
      <Navbar />
      <ExploreTopBook />
      <Carousel />
      <Heroes />
      <LibraryServices />
    </div>
  );
}

export default App;
