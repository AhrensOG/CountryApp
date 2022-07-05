import React from "react";
import { useDispatch } from "react-redux";
import { updateActivity } from "../actions";
import { useState } from 'react';
import { Link } from "react-router-dom";
import s from './Styles/UpdateActivity.module.css'

function validate(input){
  let errors = {};

  if((input.difficulty !== '' && input.difficulty < 1 ) ||(input.difficulty !== '' && input.difficulty > 5)) errors.difficulty = 'Difficulty must be greater than 1 and less than 5.'
  if((input.duration !== '' && input.duration < 1) || (input.duration !== '' && input.duration > 24)) errors.duration = 'Duration must be greater than 1 and less than 24.'

  return errors
}

export default function UpdateActivity(props) {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    idAct: props.match.params.id,
    name: '',
    difficulty: '',
    duration: '',
    season: '',
  }) 

  const handleUpdate = (e) => {
    e.preventDefault()
    if(errors.difficulty || errors.duration) return alert('Invalid data!')
    else {
      dispatch(updateActivity(input))
      setInput({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countryName: [],
      })
      document.getElementById('form').reset()
      alert('Update activity succesfully')
    }
  }

  const handleInputChange = (e) => {
    e.preventDefault()
    console.log(input)
    console.log(props.match.params.id)

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
    }else{
      setInput({
        ...input,
        season: '',
      })
    }
  }

  return (
    <div>
      <div>
        <Link to='/home' > <button className={s.btn}> Back to home </button> </Link>
      </div>

      <div className={s.containerForm}>
        <h2>Update Activity</h2>
        <form id='form' className={s.form} onSubmit={e => handleUpdate(e)}>
          <div>
            <label className={s.label} >Name: </label>
            <input className={s.input} type="text" value={input.name} name='name' placeholder="Name Activity..." onChange={e => handleInputChange(e)} />
          </div>

          <div>
            {
              errors.difficulty && <p className={s.p}>{errors.difficulty}</p>
            }
            <label className={s.label} >Difficulty: </label>
            <input className={s.input} type="number" value={input.difficulty} name='difficulty' placeholder="Number >= 1 and <=5..." onChange={e => handleInputChange(e)} />
          </div>

          <div>
            {
              errors.duration && <p className={s.p}>{errors.duration}</p>
            }
            <label className={s.label} >Duration: </label>
            <input className={s.input} type="number" name="duration" placeholder="in hours..." onChange={e => handleInputChange(e)} />
          </div>

          <div>
            <label className={s.label} >Season: </label>
            <select className={s.select} onChange={e => handleSelectSeanson(e)}>
              <option value="none"> Seasons </option>
              <option value="Primavera"> Spring </option>
              <option value="Verano"> Summer </option>
              <option value="Otoño"> Autumn </option>
              <option value="Invierno"> Winter </option>
            </select>
          </div>

          <div>
            <button className={s.btnSubmit} type="submit" id="btn" > Update </button>
          </div>
        </form>
      </div>
    </div>
  )
}