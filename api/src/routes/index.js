const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const { Country, TouristActivity } = require('../db');
const {
   getCountries,
   getCountriesById,
   postActivities,
   getAllActivities,
   getCountriesWhereActivity,
   getAllContinents,
   getCountriesWhereContinent,
   filterCountriesByPopulation,
   deleteActivities,
   updateActivities,
   allFilters,
  } = require('./controllers')

const router = Router();

//optional queryParam = name
router.get('/countries',  (req, res) => {
  getCountries(req, res);
})

router.get('/countries/:idCountry', (req, res) => {
  getCountriesById(req, res);
})

router.post('/activities',  (req, res) => {
  postActivities(req, res);
})

router.delete('/activities', (req, res) => {
  deleteActivities(req, res)
})

router.put('/activities', (req, res) => {
  updateActivities(req, res);
})
//--------------FILTERS ROUTES------------------

router.get('/activities', getAllActivities)

//this route need queryParam = nameActivity
router.get('/countriesActivity',getCountriesWhereActivity)

router.get('/continents', getAllContinents)

//this route need queryParam = nameContinent
router.get('/countriesContinent', getCountriesWhereContinent)

// this route need queryParam = typeOrder
router.get('/countriesPopulation', filterCountriesByPopulation)

// this route need query = 'nameActivity', 'continent', 'orderPop' and param = 'page'
router.get('/filters', allFilters)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
