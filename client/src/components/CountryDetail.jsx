import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getCountryDetail } from "../actions";
import DeleteActivity from "./DeleteActivity";
import s from './Styles/CountryDetail.module.css'

export default function CountryDetail(props){
  const dispatch = useDispatch()
  const country = useSelector(state => state.countryDetail)
  useEffect(() => {
    dispatch(getCountryDetail(props.match.params.id))
  },[dispatch])
  

  return(
    <div >
      <Link to='/home'>
        <button className={s.btn}>Back to home</button>
      </Link>
      <div  className={s.container}>
        <div>
          <img className={s.img} src={country.img} alt="" />
        </div>
        <div className={s.middleDiv}>
          <p className={s.nameCountry}>Name: {country.name}</p>
          <p className={s.p}>Code: {country.id}</p>
          <p className={s.p}>Capital: {country.capital}</p>
          <p className={s.p}>Subregion: {country.subregion}</p>
          <p className={s.p}>Area: {country.area} km2</p>
          <p className={s.p}>Population: {country.population}</p>
          <div className={s.activitiesDiv}>
            <p className={s.p}>Tourist Activities:</p>{
            country.touristActivities? country.touristActivities.map(t => {
              return (
                <div className={s.divAct} key={t.id}>
                  <ul className={s.ul}>
                    <li className={s.nameAct}>Name Activity: {t.name}</li>
                    {t.difficulty? (<li className={s.li}>Difficulty: {t.difficulty}</li>): (<li className={s.li}>Difficulty: unknown</li>)}
                    {t.duration? (<li className={s.li}>Duration: {t.duration} hs</li>): (<li className={s.li}>Duration: unknown</li>)}
                    {t.season? (<li className={s.li}>Season: {t.season}</li>): (<li className={s.li}>Season: unknown</li>)}
                  </ul>
                  
                  <div className={s.middleDivAct}>
                    <Link to={`/updateActivity/${t.id}`}>
                      <button className={s.middleBtn}> Update Activity </button>
                    </Link>
                    <DeleteActivity id={t.id}/>
                  </div>
                </div>
              )
            }) : (<p className={s.p}>This Country has not activities.</p>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}