const axios = require('axios');
const { Country, TouristActivity } = require('../db');


const getInfoApi = async () => {
  const urlInfo = await axios.get('https://restcountries.com/v3/all')
  let apiInfo = await urlInfo.data.map(e => {
    return {
      id : e.cca3,
      name: e.name.common,
      imgFlag: e.flags[0],
      continent: (e.continents[0] !== undefined)? e.continents[0] : 'Desconocido',
      capital: (Array.isArray(e.capital))? (e.capital[0])? e.capital[0] : 'Desconocido' : 'Desconocido',
      subregion: (e.subregion)? e.subregion : 'Desconocido',
      area: e.area,
      population: e.population,
    }
  })
  
  return apiInfo;
};

const getCountries = async (req, res) => {
  const { name } = req.query;
  const apiInfo = await getInfoApi()
  const countries = await Country.findAll({
    attributes: ['name', 'img', 'continent']
  });
  try {
    if(countries.length === 0) {
      apiInfo.forEach(c => {
        Country.findOrCreate({
          where: {
            id : c.id,
            name: c.name,
            img: c.imgFlag,
            continent: c.continent,
            capital: c.capital,
            subregion: c.subregion,
            area: c.area,
            population: c.population,
          }
        })
      });
    }
    if(name) {
      const names = countries.map(c => c.name);
      const filteredNames = names.filter(n => n.toLowerCase().startsWith(name.toLowerCase()))
      const namesMatch = [];
      countries.forEach(country => {
        filteredNames.map(name => {
          if(name === country.name) namesMatch.push(country);
        })
      })
      return namesMatch.length > 0? res.status(200).send(namesMatch) : res.status(404).json({data: 'Country not found'});
    }
    res.status(200).send(countries)
  } catch (error) {
    res.status(404).json({data: error})
  }
};

const getCountriesById = (req, res) => {
  const { idCountry } = req.params;
  Country.findByPk(idCountry.toUpperCase(), {
    include: {
      model: TouristActivity,
      through: {
        attributes: []
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  })
  .then(r => {
    r? res.status(200).send(r) : res.status(404).send({ data: 'Country not Found' });
  })
  .catch (error => res.status(404).send({ data: error }))
};

const postActivities = async (req, res) => {
  const { name, difficulty, duration, seanson, countryId } = req.body
  try {
    const createdActivity = await TouristActivity.findOrCreate({
      where: {
        name: name,
        difficulty: difficulty,
        duration: duration,
        seanson: seanson
      }
    })
    await createdActivity.addCountries(countryId)
    res.status(200).send({data: 'ok'})
  } catch (error) {
    res.status(404).send({data: error})
  }
};
module.exports = {
  getCountries,
  getCountriesById,
  postActivities,
}