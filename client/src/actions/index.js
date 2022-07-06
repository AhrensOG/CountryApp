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
  COUNTRY_DETAIL,
} from './actions';

function updateActivity(act){
  return async (dispatch) => {
    try {
      const updateActivity = await axios.put('http://localhost:3001/activities', act)
      return updateActivity;
    } catch (error) {
      alert(error.response.data.data)
    }
  }
}

function deleteActivity(id){
  return async (dispatch) => {
    try {
      const deletedCountry = await axios.delete(`http://localhost:3001/activities?id=${id}`)
      return deletedCountry;
    } catch (error) {
      alert(error.response.data.data)
    }
  }
}

function createActivity (payload){
  return async (dispatch) => {
    try {
      const countries = await axios.post('http://localhost:3001/activities',payload)
      console.log(countries)
      return countries;
    } catch (error) {
      alert(error.response.data.data)
    }
  }
} 

function getAllCountries() {
  return async (dispatch) => {
    try {
      const infoCountries = await axios.get('http://localhost:3001/countries')
      return dispatch({
        type: GET_ALL_COUNTRIES,
        payload: infoCountries.data,
      })
    } catch (error) {
      alert(error.response.data.data)
    }
  }
}

function getCountriesByName(name) {
  return async (dispatch) => {
    try {
      const countries = await axios.get(`http://localhost:3001/countries?name=${name}`)
      return dispatch({
        type: GET_COUNTRIES_BY_NAME,
        payload: countries.data,
      })
    } catch (error) {
      alert(error.response.data.data)
    }
  }
}

function getAllActivities(){
  return async (dispatch) => {
    try {
      const activities = await axios.get('http://localhost:3001/activities')
      return dispatch({
        type: GET_ALL_ACTIVITIES,
        payload: activities.data,
      })
    } catch (error) {
      alert(error.response.data.data)
    }
  }
}

function getAllContinents(){
  return async (dispatch) => {
    try {
      const continents = await axios.get(`http://localhost:3001/continents`)
      return dispatch({
        type: GET_ALL_CONTINENTS,
        payload: continents.data,
      })
    } catch (error) {
      alert(error.response.data.data)
    }
  }
}

function filterCountriesByActivity(activity){
  return async (dispatch) => {
    try {
      const countries = await axios.get(`http://localhost:3001/countriesActivity?nameActivity=${activity}`)
      return dispatch({
        type: FILTER_COUNTRIES_BY_ACTIVITY,
        payload: countries.data
      })
    } catch (error) {
      alert(error.response.data.data)
    }
  }
}

function filterCountriesByContinent(continent){
  return async (dispatch) => {
    try {
      const countries = await axios.get(`http://localhost:3001/countriesContinent?nameContinent=${continent}`)
  
      return dispatch({
        type: FILTER_COUNTRIES_BY_CONTINENT,
        payload: countries.data
      })
    } catch (error) {
      alert(error.response.data.data)
    }
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
    .catch(error => alert(error.response.data.data))
  }
}

function getCountryDetail(id) {
  return (dispatch) => {
    axios.get(`http://localhost:3001/countries/${id}`)
    .then(r => {
      return dispatch({
        type: COUNTRY_DETAIL,
        payload: r.data,
      })
    })
    .catch(error => alert(error.response.data.data))
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
  createActivity,
  getCountryDetail,
  deleteActivity,
  updateActivity,
};