const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Country, TouristActivity } = require('../db');
const { getCountries, getCountriesById, postActivities } = require('./controllers')

const router = Router();

router.get('/countries',  (req, res) => {
  getCountries(req, res);
})

router.get('/countries/:idCountry', (req, res) => {
  getCountriesById(req, res);
})

router.post('/activities',  (req, res) => {
  postActivities(req, res);
})
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
