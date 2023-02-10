import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiUrl } from "../utils/api";

const Country = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const { countryName } = useParams();

  useEffect(() => {
    const getCountry = async () => {
      try {
        const res = await fetch(`${apiUrl}/name/${countryName}`);
        if (!res.ok) throw new Error("Not found any country with this name");
        const data = await res.json();
        setCountry(data);
      } catch (error) {
        setIsError(error.message);
      }
      setIsLoading(false);
    };
    getCountry();
  }, [countryName]);

  return (
    <div className="container country__info">
      <button>
        <Link to="/">Back</Link>
      </button>
      {isLoading && !isError && (
        <p className="dataloading">loading..........</p>
      )}
      {!isLoading && isError && <p className="dataerror">{isError}</p>}
      {country?.map((country, index) => (
        <div className="card mb-3 countryCard" key={index}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={country.flags.png}
                className="card-img-top"
                alt={country.name.common}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {country.name.common} ( {country.name.official} )
                </h5>
                <p className="card-text">
                  Capital: {country.capital}
                  <br /> Populations: {country.population}
                  <br /> Areas of land: {country.area} Square KM
                  <br />
                  Currency:{" "}
                  {country.currencies[Object.keys(country.currencies)].name}(
                  {country.currencies[Object.keys(country.currencies)].symbol} )
                  <br /> Region: {country.region}
                  <br /> Sub Region: {country.subregion}
                  <br /> Borders:{" "}
                  {country?.borders
                    ? country?.borders?.map((border) => border + ", ")
                    : "No borders available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Country;
