import React from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layouts/NavbarAndFooter/Navbar";
import Footer from "./layouts/NavbarAndFooter/Footer";
import HomePage from "./layouts/HomePage/HomePage";
import { SearchBookPage } from "./layouts/SearchBookPage/SearchBookPage";

function App() {
  return (
    <div>
      <Navbar />
      <SearchBookPage />
      {/* <HomePage /> */}
      <Footer />
    </div>
  );
}

export default App;
