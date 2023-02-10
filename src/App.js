import "./App.css";
import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import AllCountries from "./component/allCountries/AllCountries";
import Country from "./component/country/Country";

function App() {
  return (
    <Fragment>
      <div className="container-fluid header">
        <div className="container">
          <nav className="navbar">
            <div className="container-fluid">
              <h3>Country API</h3>
            </div>
          </nav>
        </div>
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<AllCountries />} />
          <Route path="/country/:countryName" element={<Country />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
