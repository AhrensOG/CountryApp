import React from "react";
import s from './Styles/Paged.module.css'

export default function Paged ({ countriesPerPage, allCountries, paged }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil((allCountries - 9)/countriesPerPage) + 1; i++) {
    pageNumbers.push(i);
  }

  return(
    <nav className={s.nav}>
      <ul className={s.ul}>
        {
          pageNumbers && pageNumbers.map(n => {
            return (
              <li className={s.li} key={n}>
                <a onClick={() =>  paged(n) } >{n}</a>
              </li>
            )
          })
        }
      </ul>
    </nav>
  );
}