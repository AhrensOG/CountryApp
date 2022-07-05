import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { 
  getAllCountries,
  getAllActivities,
  getAllContinents,
  filterCountriesByActivity,
  filterCountriesByContinent,
  filterByName,
  filterByPopulation,
} from "../actions";
import Card from "./CountryCard";
import Paged from "./Paged";
import SearchBar from "./SearchBar";

import s from './Styles/Home.module.css'


export default function Home(){
  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.countries);
  const allActivities = useSelector(state => state.activities);
  const allContinents = useSelector(state => state.continents);
  //------STATE FOR FILTERS------------
  const [order, setOrder] = useState('');
  const [currentPage, setCurrentPage ] = useState(1);
  const [countriesPerPage] = useState(10);
  const indexLastCountry = currentPage * countriesPerPage;
  const indexFirstCountry = indexLastCountry - countriesPerPage;
  const currentCountries = (currentPage === 1) ? allCountries.slice(0, 9) : allCountries.slice(indexFirstCountry - 1, indexLastCountry - 1);
  //-----------------------------------

  const paged = (pageNum) => {
    setCurrentPage(pageNum);
  };


  useEffect(()=>{
    dispatch(getAllCountries());
    dispatch(getAllActivities());
    dispatch(getAllContinents())
  }, [dispatch]);

  const handleFilterActivity = (e) => {
    e.preventDefault();
    if(e.target.value === '') return;
      dispatch(filterCountriesByActivity(e.target.value))
  };

  const handleFilterContinent = (e) => {
    e.preventDefault();
    if(e.target.value === '') return;
    dispatch(filterCountriesByContinent(e.target.value))
  };

  const handleFilterByName = (e) => {
    e.preventDefault();
    if(e.target.value === '') return;
    if(e.target.value === 'none'){
      dispatch(getAllCountries())
    }else{
      dispatch(filterByName(e.target.value))
    }
    setCurrentPage(1);
    setOrder(`${e.target.value} Order`);
  };

  const handleFilterByPopulation = (e) => {
    e.preventDefault();
    if(e.target.value === '') return;
    dispatch(filterByPopulation(e.target.value))
  };

  const handleResetFilters = (e) => {
    e.preventDefault()
    dispatch(getAllCountries())
    setCurrentPage(1)
    document.getElementById('orderByName').selectedIndex = 0;
    document.getElementById('orderByPopulation').selectedIndex = 0;
    document.getElementById('activities').selectedIndex = 0;
    document.getElementById('continents').selectedIndex = 0;
  }

  return (
    <div>
      <div className={s.title}>
        <h1>¡Travel around the world!</h1>
      </div>
      <div className={s.search_create}>
        <SearchBar />
        <Link to='/activities'> <button className={s.btnCreate}> Create Activity </button> </Link>
      </div>

      <div className={s.filters}>
        <button className={s.btn} onClick={e => handleResetFilters(e)}> ResetFilters </button>

        <select id='orderByName' className={s.btn} onChange={e => handleFilterByName(e)}>
          <option key='' value=""> OrderByName </option>
          <option key='none' value="none"> All </option>
          <option key='asc' value="asc"> A - Z </option>
          <option key='desc' value="desc"> Z - A  </option>
        </select>

        <select id="orderByPopulation" className={s.btn} onChange={e => handleFilterByPopulation(e)}>
          <option value=''> OrderByPopulation </option>
          <option value="all"> All </option>
          <option value="asc"> Min - Max </option>
          <option value="desc"> Max - Min </option>
        </select>

        <select id="activities" className={s.btn} onChange={e => handleFilterActivity(e)}>
          <option value=""> Activities </option>
          <option value="all"> All </option>
          {
            allActivities && allActivities.map(a => {
              return <option value={`${a.DISTINCT}`} key={a.DISTINCT}> {a.DISTINCT.toLowerCase()} </option>
            })
          }
        </select>

        <select id="continents" className={s.btn} onChange={e => handleFilterContinent(e)}>
          <option value=""> Continents </option>
          <option value="all"> All </option>
          {
            allContinents && allContinents.map(c =>{
              return (
                <option value={c} key={c}> {c} </option>
              )
            })
          }
        </select>
      </div>
      
      <div className={s.paged}>
        <Paged countriesPerPage={countriesPerPage} allCountries={allCountries.length} paged={paged}/>
      </div>
      <div className={s.cards}>
        {
          currentCountries?.map(c => {
            return (
              <Card img={c.img} name={c.name} continent={c.continent} id={c.id} key={c.id}/>
            )
          })
        }
      </div>
    </div>
  );

}
