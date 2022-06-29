import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createActivity, getAllCountries } from "../actions";

// var regex = new RegExp(/^[A-Za-z0-9\s]+$/g);

function validate(input){
  let errors = {};
  if(!input.name) errors.name = 'Name is required.'
  if(input.difficulty !== '' && input.difficulty < 1 || input.difficulty > 5) errors.difficulty = 'Difficulty must be greater than 1 and less than 5.'
  if(input.duration !== '' && input.duration < 1 || input.duration > 24) errors.duration = 'Duration must be greater than 1 and less than 24.'
  if(!input.countryName.length) errors.countryName = 'Country is required.'

  return errors
}

export default function CreateActivity() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countryName: [],
  }) ;  

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch])

  function handleInputChange(e) {
    e.preventDefault()
      setInput({
        ...input,
        [e.target.name] : e.target.value,
      })
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value,
    }))
  }

  function handleSelectSeanson(e) {
    e.preventDefault()
    if(e.target.value !== 'none') {
      setInput({
        ...input,
        season: e.target.value,
      })
    }
  }

  function handleSelectCountry(e) {
    e.preventDefault()
    if(e.target.value !== 'none') {
      if(!input.countryName.includes(e.target.value)){
        setInput({
          ...input,
          countryName: [...input.countryName, e.target.value]
        })
      }
    }
  }

  function handleDelet(e) {
    e.preventDefault()
    const aux = input.countryName.filter(n => n !== e.target.value)
    setInput({
      ...input,
      countryName: aux
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if(errors.name || errors.difficulty || errors.duration || errors.countryName) return alert('Unfilled fields!')
    else {
      dispatch(createActivity(input))
      setInput({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countryName: [],
      })
    }
  }

  return (
    <div>
      <div>
        <Link to='/home' > <button> Back </button> </Link>
      </div>
      <div>
        <h2> Create Activity </h2>
        <form onSubmit={e => handleSubmit(e)}>

         <div>
            {
              errors.countryName && <p>{errors.countryName}</p>
            }
            <label>Countries: </label>
            <select onChange={e => handleSelectCountry(e)}>
              <option value="none"> Countries </option>
              {
                countries.length > 0 && countries.map(c => {
                  return (
                    <option value={c.name} key={c.id} >{c.name}</option>
                  )
                })
              }
            </select>
          </div>

          <div>
            {
              errors.name && <p>{errors.name}</p>
            }
            <label> Name: </label>
            <input type="text" value={input.name} name='name' placeholder="Activity Name..." onChange={e => handleInputChange(e)}/>
          </div>

          <div>
            {
              errors.difficulty && <p>{errors.difficulty}</p>
            }
            <label> Difficulty: </label>
            <input type="number" value={input.difficulty} name='difficulty' placeholder="Number >= 1 and <=5..." onChange={e => handleInputChange(e)}/>
          </div>

          <div>
            {
              errors.duration && <p>{errors.duration}</p>
            }
            <label> Duration: </label>
            <input type="number" name="duration" placeholder="in hours..." onChange={e => handleInputChange(e)}/>
          </div>

          <div>
            <label> Season: </label>
            <select onChange={e => handleSelectSeanson(e)}>
              <option value="none"> Seasons </option>
              <option value="Primavera"> Spring </option>
              <option value="Verano"> Summer </option>
              <option value="Otoño"> Autumn </option>
              <option value="Invierno"> Winter </option>
            </select>
          </div>

          <div>
            <ul>
              {
                input.countryName.length > 0 && input.countryName.map(c => {
                  return (
                    <div key={c}>
                      <button key={c} value={c} onClick={e => handleDelet(e)}>X</button>
                      <li>{c}</li>
                    </div>
                  )
                })
              }
            </ul>
          </div>
        
          <div>
            <button type="submit" id="btn" > Create </button>
          </div>

        </form>
      </div>
    </div>
  )

}