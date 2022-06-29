import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getCountryDetail } from "../actions";

export default function CountryDetail(props){
  const dispatch = useDispatch()
  const country = useSelector(state => state.countryDetail)
  useEffect(() => {
    dispatch(getCountryDetail(props.match.params.id))
  },[dispatch])
  

  return(
    <div>
      <Link to='/home'>
        <button>Back to home</button>
      </Link>
      <div>
        <img src={country.img} alt="" />
      </div>
      <div>
        <p>Code: {country.id}</p>
        <p>Capital: {country.capital}</p>
        <p>Subregion: {country.subregion}</p>
        <p>Area: {country.area} km2</p>
        <p>Population: {country.population}</p>
        <div>Tourist Activities: {
          country.touristActivities? country.touristActivities.map(t => {
            return (
              <div key={t.id}>
                <ul>
                  <li>Name Activity: {t.name}</li>
                  {t.difficulty? (<li>Difficulty: {t.difficulty}</li>): (<li>Difficulty: unknown</li>)}
                  {t.duration? (<li>Duration: {t.duration}</li>): (<li>Duration: unknown</li>)}
                  {t.season? (<li>Season: {t.season}</li>): (<li>Season: unknown</li>)}
                </ul>
              </div>
            )
          }) : (<p>This Country has not activities.</p>)
          }</div>
      </div>
    </div>
  )
}