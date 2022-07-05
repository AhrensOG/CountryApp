import React from "react";
import { Link } from "react-router-dom";
import s from './Styles/CountryCard.module.css'

export default function Card({img, name, continent, id}){
  return (
    <div className={s.card}>

      <Link to={`/home/${id}`} >
        <img className={s.img} src={img} alt="not found" />
      </Link>
      <div className={s.midDiv}>
        <Link to={`/home/${id}`} >
          <p className={s.p}>Country Name: {name}</p>
        </Link>
        <Link to={`/home/${id}`} >
          <p className={s.p2}>Continent: {continent}</p>
        </Link>
      </div>

    </div>
  )
};