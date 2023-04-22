import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error));
  }, []);

  const filteredCountries =
    query === ""
      ? []
      : countries.filter(
          (country) =>
            country.name.common.toLowerCase().indexOf(query.toLowerCase()) !==
            -1
        );

  const handleQueryChange = (event) => setQuery(event.target.value);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const displayCountries =
    filteredCountries.length > 10 ? (
      <p>Too many matches, specify another filter</p>
    ) : filteredCountries.length > 1 ? (
      filteredCountries.map((country) => (
        <div key={country.cca2}>
          <p>{country.name.common}</p>
          <button onClick={() => handleCountrySelect(country)}>Show</button>
        </div>
      ))
    ) : filteredCountries.length === 1 ? (
      <div>
        <h1>{filteredCountries[0].name.common}</h1>
        <p>Capital: {filteredCountries[0].capital[0]}</p>
        <p>Area: {filteredCountries[0].area} km²</p>
        <img
          src={filteredCountries[0].flags.svg}
          alt={`Flag of ${filteredCountries[0].name.common}`}
          width="200px"
        />
        <h3>Languages:</h3>
        <ul>
          {Object.values(filteredCountries[0].languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
    ) : (
      <p>No countries found</p>
    );

  const displaySelectedCountry = selectedCountry && (
    <div>
      <h1>{selectedCountry.name.common}</h1>
      <p>Capital: {selectedCountry.capital[0]}</p>
      <p>Area: {selectedCountry.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(selectedCountry.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={selectedCountry.flags.svg}
        alt={`Flag of ${selectedCountry.name.common}`}
        width="200px"
      />

    </div>
  );

  return (
    <div>
      <h1>Country App</h1>
      <div>
        <label htmlFor="search-input">Search for a country: </label>
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      {displayCountries}
      {displaySelectedCountry}
    </div>
  );
}

export default App
