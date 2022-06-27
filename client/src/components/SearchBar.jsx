import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCountries, getCountriesByName } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');



  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputSearch = document.getElementById('inputSearch')
    inputSearch.value === ''? dispatch(getAllCountries()) : dispatch(getCountriesByName(name));
    inputSearch.value ='';
  };
   
  return (
    <div>
      <input id="inputSearch" type="text" placeholder="Search Countries..."  onChange={e => handleInputChange(e)}/>
      <button type="submit" onClick={e => handleSubmit(e) }> Search </button>
    </div>
  )
};