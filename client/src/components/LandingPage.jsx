import React from "react";
import { Link } from 'react-router-dom';
import s from './Styles/LandingPage.module.css'

export default function LandingPage() {
  return(
    <div className={s.ldpg}>
      <h1 className={s.h1}>Welcome to CountryApp</h1>
      <Link to='/home'>
        <button type='button' className={s.btn}>Go Home</button>
      </Link>
    </div>
  )
}