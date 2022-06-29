import {
  GET_ALL_COUNTRIES,
  GET_ALL_ACTIVITIES,
  GET_ALL_CONTINENTS,
  FILTER_COUNTRIES_BY_ACTIVITY,
  FILTER_COUNTRIES_BY_CONTINENT,
  FILTER_BY_NAME,
  FILTER_BY_POPULATION,
  GET_COUNTRIES_BY_NAME,
  CREATE_ACTIVITY,
  COUNTRY_DETAIL,
} from "../actions/actions";

const initialState = {
  countries: [],
  activities: [],
  continents: [],
  countryDetail: {}
}

function rootReducer (state = initialState, action){
  switch (action.type) {
    case CREATE_ACTIVITY:
      return {
        ...state,
      }
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      }
    case GET_COUNTRIES_BY_NAME:
      return {
        ...state,
        countries: action.payload,
      }
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      }
    case GET_ALL_CONTINENTS:
      return {
        ...state,
        continents: action.payload,
      }
    case FILTER_COUNTRIES_BY_ACTIVITY:
      return {
        ...state,
        countries: action.payload,
      }
    case FILTER_COUNTRIES_BY_CONTINENT:
      return {
        ...state,
        countries: action.payload,
      }
    case FILTER_BY_NAME:
      const orderedArr = action.payload === 'asc' ? state.countries.sort((a, b) => {
        if(a.name > b.name) return 1;
        if(b.name > a.name) return -1;
        return 0;
      }): state.countries.sort((a, b) => {
        if(a.name > b.name) return -1;
        if(b.name > a.name) return 1;
        return 0
      });
      return {
        ...state,
        countries: orderedArr,
      }
    case FILTER_BY_POPULATION:
      return {
        ...state,
        countries: action.payload
      }
    case COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      }
    default:
      return state;
  }
}

export default rootReducer;