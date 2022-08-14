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
  filters,
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
  const [typeFilter, setTypeFilter] = useState({})
  const [filterFlag, setFilterFlag] = useState(false)
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

  const handleFilterByName = (e) => {
    e.preventDefault();
    if(e.target.value === '') return;
    dispatch(filterByName(e.target.value))
    setCurrentPage(1);
    setOrder(`${e.target.value} Order`);
  };

  const handleResetFilters = (e) => {
    e.preventDefault()
    dispatch(getAllCountries())
    setCurrentPage(1)
    setTypeFilter({})
    document.getElementById('orderByName').selectedIndex = 0;
    document.getElementById('orderPop').selectedIndex = 0;
    document.getElementById('nameActivity').selectedIndex = 0;
    document.getElementById('continent').selectedIndex = 0;
  }

  useEffect(() => {
    if(filterFlag) dispatch(filters(typeFilter));
    setFilterFlag(false)
  }, [typeFilter, filterFlag])

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setFilterFlag(true)
  }
  const handleFilters = async (e) => {
    e.preventDefault()
    setTypeFilter({
      ...typeFilter,
      [e.target.id]: e.target.value,
    })
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
          <option value=""> OrderByName </option>
          <option key='asc' value="asc"> A - Z </option>
          <option key='desc' value="desc"> Z - A  </option>
        </select>

        <select id="orderPop" className={s.btn} onChange={e => handleFilters(e)}>
          <option value={undefined}> OrderByPopulation </option>
          <option value="asc"> Min - Max </option>
          <option value="desc"> Max - Min </option>
        </select>

        <select id="nameActivity" className={s.btn} onChange={e => handleFilters(e)}>
          <option value=""> Activities </option>
          {
            allActivities && allActivities.map(a => {
              return <option value={`${a.DISTINCT}`} key={a.DISTINCT}> {a.DISTINCT.toLowerCase()} </option>
            })
          }
        </select>

        <select id="continent" className={s.btn} onChange={e => handleFilters(e)}>
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
      <div>
      <button className={s.btn} onClick={e => handleApplyFilters(e)}> ApplyFilters </button>
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
