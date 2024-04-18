import React from "react";

import "./App.css";
import Navbar from "./layouts/NavbarAndFooter/Navbar";
import ExploreTopBook from "./layouts/HomePage/ExploreTopBook";
import Carousel from "./layouts/HomePage/Carousel";
import Heroes from "./layouts/HomePage/Heroes";

function App() {
  return (
    <div>
      <Navbar />
      <ExploreTopBook />
      <Carousel />
      <Heroes />
    </div>
  );
}

export default App;
