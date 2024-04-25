import React from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layouts/NavbarAndFooter/Navbar";
import Footer from "./layouts/NavbarAndFooter/Footer";
import HomePage from "./layouts/HomePage/HomePage";

function App() {
  return (
    <div>
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
