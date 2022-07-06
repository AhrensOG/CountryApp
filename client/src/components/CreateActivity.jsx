import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createActivity, getAllCountries } from "../actions";
import s from './Styles/CreateActivity.module.css'

// var regex = new RegExp(/^[A-Za-z0-9\s]+$/g);

function validate(input){
  let errors = {};
  if(!input.name || input.name === '') errors.name = 'Name is required.'
  if((input.difficulty !== '' && input.difficulty < 1 ) || input.difficulty > 5) errors.difficulty = 'Difficulty must be greater than 1 and less than 5.'
  if((input.duration !== '' && input.duration < 1) || input.duration > 24) errors.duration = 'Duration must be greater than 1 and less than 24.'
  if(!input.countryName.length) errors.countryName = 'Country is required.'

  const btn = document.getElementById('btn')
  btn.setAttribute('disabled', true)
  if(!Object.keys(errors).length) btn.removeAttribute('disabled')
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
    validate(input)
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
      document.getElementById('form').reset()
      alert('Create activity succesfully')
    }
  }

  return (
    <div>
      <div>
        <Link to='/home' > <button className={s.btn}> Back </button> </Link>
      </div>
      <div className={s.containerForm}>
        <h2> Create Activity </h2>
        <form id='form' className={s.form} onSubmit={e => handleSubmit(e)}>

         <div>
            {
              errors.countryName && <p className={s.p}>{errors.countryName}</p>
            }
            <label className={s.label}>Countries: </label>
            <select className={s.select} onChange={e => handleSelectCountry(e)}>
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
              errors.name && <p className={s.p}>{errors.name}</p>
            }
            <label className={s.label}> Name: </label>
            <input className={s.input} type="text" value={input.name} name='name' placeholder=" Name Activity..." onChange={e => handleInputChange(e)}/>
          </div>

          <div>
            {
              errors.difficulty && <p className={s.p}>{errors.difficulty}</p>
            }
            <label className={s.label}> Difficulty: </label>
            <input className={s.input} type="number" value={input.difficulty} name='difficulty' placeholder=" Number >= 1 and <=5..." onChange={e => handleInputChange(e)}/>
          </div>

          <div>
            {
              errors.duration && <p className={s.p}>{errors.duration}</p>
            }
            <label className={s.label}> Duration: </label>
            <input className={s.input} type="number" name="duration" placeholder=" in hours..." onChange={e => handleInputChange(e)}/>
          </div>

          <div>
            <label className={s.label}> Season: </label>
            <select className={s.select} onChange={e => handleSelectSeanson(e)}>
              <option value="none"> Seasons </option>
              <option value="Primavera"> Spring </option>
              <option value="Verano"> Summer </option>
              <option value="Otoño"> Autumn </option>
              <option value="Invierno"> Winter </option>
            </select>
          </div>

          <div>
            <ul className={s.ul}>
              {
                input.countryName.length > 0 && input.countryName.map(c => {
                  return (
                    <div className={s.ulDiv} key={c}>
                      <div className={s.minorUlDiv}>
                        <button className={s.btnCloseCountry} key={c} value={c} onClick={e => handleDelet(e)}>X</button>
                      </div>
                      <li className={s.li}>{c}</li>
                    </div>
                  )
                })
              }
            </ul>
          </div>
        
          <div>
            <button className={s.btnSubmit} type="submit" id="btn" > Create </button>
          </div>

        </form>
      </div>
    </div>
  )

}