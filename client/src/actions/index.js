import axios from 'axios';
import { 
  GET_ALL_COUNTRIES,
  GET_ALL_ACTIVITIES,
  GET_ALL_CONTINENTS,
  FILTER_COUNTRIES_BY_ACTIVITY,
  FILTER_COUNTRIES_BY_CONTINENT,
  FILTER_BY_NAME,
  FILTER_BY_POPULATION,
  GET_COUNTRIES_BY_NAME,
} from './actions';

function getAllCountries() {
  return async (dispatch) => {
    const infoCountries = await axios.get('http://localhost:3001/countries')
    return dispatch({
      type: GET_ALL_COUNTRIES,
      payload: infoCountries.data,
    })
  }
}

function getCountriesByName(name) {
  return async (dispatch) => {
    const countries = await axios.get(`http://localhost:3001/countries?name=${name}`)
    return dispatch({
      type: GET_COUNTRIES_BY_NAME,
      payload: countries.data,
    })
  }
}

function getAllActivities(){
  return async (dispatch) => {
    const activities = await axios.get('http://localhost:3001/activities')
    return dispatch({
      type: GET_ALL_ACTIVITIES,
      payload: activities.data,
    })
  }
}

function getAllContinents(){
  return async (dispatch) => {
    const continents = await axios.get(`http://localhost:3001/continents`)

    return dispatch({
      type: GET_ALL_CONTINENTS,
      payload: continents.data,
    })
  }
}

function filterCountriesByActivity(activity){
  return async (dispatch) => {
    const countries = await axios.get(`http://localhost:3001/countriesActivity?nameActivity=${activity}`)

    return dispatch({
      type: FILTER_COUNTRIES_BY_ACTIVITY,
      payload: countries.data
    })
  }
}

function filterCountriesByContinent(continent){
  return async (dispatch) => {
    const countries = await axios.get(`http://localhost:3001/countriesContinent?nameContinent=${continent}`)

    return dispatch({
      type: FILTER_COUNTRIES_BY_CONTINENT,
      payload: countries.data
    })
  }
}

function filterByName(payload){
  return (dispatch) => {
    return dispatch({
      type: FILTER_BY_NAME,
      payload
    })
  }
}

function filterByPopulation(value){
  return (dispatch) => {
    axios.get(`http://localhost:3001/countriesPopulation?typeOrder=${value}`)
    .then(r => {
      return dispatch({
        type: FILTER_BY_POPULATION,
        payload: r.data,
      })
    })
    .catch(err => err.message)
  }
}
export { 
  getAllCountries,
  getAllActivities,
  getAllContinents,
  filterCountriesByActivity,
  filterCountriesByContinent,
  filterByName,
  filterByPopulation,
  getCountriesByName,
};