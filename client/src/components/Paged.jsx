import React from "react";

export default function Paged ({ countriesPerPage, allCountries, paged }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allCountries/countriesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return(
    <nav>
      <ul>
        {
          pageNumbers?.map(n => {
            return (
              <li key={n}>
                <a name={n} onClick={(e) =>  paged(e.target.name) } >{n}</a>
              </li>
            )
          })
        }
      </ul>
    </nav>
  );
}