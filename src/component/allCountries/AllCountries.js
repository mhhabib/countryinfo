import React, { useEffect, useState } from "react";
import SearchCountry from "../search/search";
import FilterCountry from "../filterCountry/filterCountry";
import { apiUrl } from "../utils/api";
import { Link } from "react-router-dom";

const AllCountries = (props) => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(`${apiUrl}/all`);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const countryData = await response.json();
        countryData.sort(function (a, b) {
          return a.name.common > b.name.common;
        });
        setCountries(countryData);
        setIsError(null);
      } catch (error) {
        setIsError(error.message);
        setCountries([]);
      }
      setIsLoading(false);
    };
    fetchApi();
  }, []);

  const getCountryByName = async (countryName) => {
    setIsLoading(true);
    setIsError(null);

    try {
      const res = await fetch(`${apiUrl}/name/${countryName}`);
      if (!res.ok) throw new Error("Not found any country");
      const data = await res.json();

      data.sort(function (a, b) {
        return a.name.common > b.name.common;
      });

      setCountries(data);
    } catch (error) {
      setIsError(error.message);
      setCountries([]);
    }
    setIsLoading(false);
  };

  const getCountryByRegion = async (region) => {
    setIsLoading(true);
    setIsError(null);
    try {
      let res = null;
      if (region === "Empty") res = await fetch(`${apiUrl}/all`);
      else res = await fetch(`${apiUrl}/region/${region}`);
      if (!res.ok) throw new Error("Not found any country with this region");
      const data = await res.json();
      data.sort(function (a, b) {
        return a.name.common > b.name.common;
      });

      setCountries(data);
    } catch (error) {
      setIsError(error.message);
      setCountries([]);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="container serachzone">
        <div className="search">
          <SearchCountry onSearch={getCountryByName} />
        </div>
        <div className="filter">
          <FilterCountry onSelect={getCountryByRegion} />
        </div>
      </div>
      <div className="container countryinfo">
        {isLoading && !isError && (
          <p className="dataloading">Data loading.......</p>
        )}
        {!isLoading && isError && <p className="dataerror">{isError}</p>}

        {countries?.map((country) => (
          <Link to={`/country/${country.name.common}`}>
            <div key={country.id} className="card" style={{ width: "15rem" }}>
              <img
                src={country.flags.png}
                className="card-img-top"
                alt="country flag"
              />
              <div className="card-body">
                <p className="card-text">
                  {country.name.common} ({country.name.official}) <br />
                  <br /> Capital: {country.capital}
                  <br /> Region: {country.region}
                  <br /> Population: {country.population}
                  <br /> Area: {country.area}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
export default AllCountries;
