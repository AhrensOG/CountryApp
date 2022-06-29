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


export default function Home(){
  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.countries);
  const allActivities = useSelector(state => state.activities);
  const allContinents = useSelector(state => state.continents);
  //------STATE FOR FILTERS------------
  const [order, setOrder] = useState('');
  const [currentPage, setCurrentPage ] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);
  const indexLastCountry = currentPage * countriesPerPage;
  const indexFirstCountry = indexLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(indexFirstCountry, indexLastCountry);
  //-----------------------------------

  const paged = (pageNum) => {
    if(currentPage !== 1){
      setCountriesPerPage(10)
    }else {
      setCountriesPerPage(9)
    }
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
  }

  return (
    <div>

      <div>
        <Link to='/activities'> Create Activity </Link>
      </div>

      <div>
          <button onClick={e => handleResetFilters(e)}> ResetFilters </button>

        <select onChange={e => handleFilterByName(e)}>
          <option key='' value=""> OrderByName </option>
          <option key='none' value="none"> All </option>
          <option key='asc' value="asc"> A - Z </option>
          <option key='desc' value="desc"> Z - A  </option>
        </select>

        <select onChange={e => handleFilterByPopulation(e)}>
          <option value=''> OrderByPopulation </option>
          <option value="all"> All </option>
          <option value="asc"> Min - Max </option>
          <option value="desc"> Max - Min </option>
        </select>

        <select onChange={e => handleFilterActivity(e)}>
          <option value=""> Activities </option>
          <option value="all"> All </option>
          {
            allActivities && allActivities.map(a => {
              return <option value={`${a.DISTINCT}`} key={a.DISTINCT}> {a.DISTINCT.toLowerCase()} </option>
            })
          }
        </select>

        <select onChange={e => handleFilterContinent(e)}>
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
        <SearchBar />
      </div>
      <div>
        <Paged countriesPerPage={countriesPerPage} allCountries={allCountries.length} paged={paged}/>
      </div>
      <div>
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
