const axios = require('axios');
const { Country, TouristActivity } = require('../db');
const { Op, TableHints } = require('sequelize');


const getInfoApi = async () => {
  const urlInfo = await axios.get('https://restcountries.com/v3/all')
  let apiInfo = await urlInfo.data.map(e => {
    return {
      id : e.cca3,
      name: e.name.common,
      imgFlag: e.flags[0],
      continent: (e.continents[0] !== undefined)? e.continents[0] : 'Unknow',
      capital: (Array.isArray(e.capital))? (e.capital[0])? e.capital[0] : 'Unknow' : 'Unknow',
      subregion: (e.subregion)? e.subregion : 'Unknow',
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
    attributes: ['id', 'name', 'img', 'continent']
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
      const createdCountries = await Country.findAll({
        attributes: ['id', 'name', 'img', 'continent']
      })
      return res.status(200).send(createdCountries);
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
      }
    }
  })
  .then(r => {
    r? res.status(200).send(r) : res.status(404).send({ data: 'Country not Found' });
  })
  .catch (error => res.status(404).send({ data: error }))
};

const postActivities = async (req, res) => {
  const { name, difficulty, duration, season, countryName } = req.body;
  try {
    if(!countryName.length) return res.status(400).send({data: 'Missing Data'})

    const foundCountry = await Country.findAll({
      where:{
        name: countryName,
      },
      include: {
        model: TouristActivity,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    })
    const foundActivity = foundCountry.map(a => a.touristActivities).flat()
    const foundNameActivity = foundActivity.map(a => a.dataValues.name)
    if(foundNameActivity.length) {
      for (const e of foundNameActivity) {
        if(e.toLowerCase() === name.toLowerCase()) return res.status(400).send({data: 'The selected country already has that activity'}) 
      }
    }
    const createdActivity = await TouristActivity.create({
      name: name? name : 'Unknow',
      difficulty: difficulty? difficulty : 'Unknow',
      duration: duration? Number(duration): 'Unknow',
      season: season? season : 'Unknow',
    })
    const countryId = foundCountry.map(c => c.id)
    await createdActivity.addCountries(countryId)
    return res.status(200).send({data: 'Activity created succesfully'})  

  } catch (error) {
    res.status(404).send({data: error.message})
  }
};

const deleteActivities = async (req, res) => {
  const { id } = req.query;
  try {
    const activity = await TouristActivity.findByPk(id);
    if(activity){
      await TouristActivity.destroy({
        where: {
          id
        }
      })
      return res.status(200).send({ data: 'Activity deleted succesfully' })
    }
    res.status(404).send({ data: 'Activity not found' })
  } catch (error) {
    res.status(404).send({data: error.message})
  }
}

const updateActivities = async (req, res) => {
  const { idAct, name, difficulty, duration, season } = req.body;
  try {
    if(!idAct) {
      return res.status(400).send({ data: 'Missing Data' })
    }

    const id = Number(idAct)
    
    if (name) {
      await TouristActivity.update({
        name: name,
      },{
        where: {
          id
        }
      })
    }
    if (difficulty) {
      await TouristActivity.update({
        difficulty: difficulty,
      },{
        where: {
          id
        }
      })
    }
    if (duration) {
      await TouristActivity.update({
        duration: Number(duration),
      },{
        where: {
          id
        }
      })
    }
    if (season) {
      await TouristActivity.update({
        season: season,
      },{
        where: {
          id
        }
      })
    }
    return res.status(200).send('Activity updated successfully')
  } catch (error) {
    res.status(404).send({ data: error.message })
  }
}

// ----------- FILTERS------------

const getAllActivities =  (req, res) => {
    TouristActivity.aggregate('name', 'DISTINCT', { plain: false })
    .then(r => {
      res.status(200).send(r);
    })
    .catch(error => {
      res.status(404).send({ data: error.message })
    })   
};

const getCountriesWhereActivity = async (req, res)=>{
  const {nameActivity} = req.query
  try {
    const countries = await Country.findAll({
      include: {
        model: TouristActivity,
        through: {
          attributes: []
        }
      }
    })

    const filteredCountries =[];
    if(nameActivity === 'all'){
      for (const c of countries) {
        if(c.touristActivities.length > 0){
          filteredCountries.push(c)
        }
      }
    }else {
      for (const c of countries) {
        c.touristActivities.forEach(a => {
          if(a.dataValues.name.toLowerCase() === nameActivity.toLowerCase()){
            filteredCountries.push(c);
          }
        })
      }
    }
    filteredCountries.length? res.status(200).send(filteredCountries) : res.status(400).send({ data: 'No countries found with associated activity' })
  } catch (error) {
    res.status(404).send({ data: error.message })
  }
};

const getAllContinents = (req, res) => {
  Country.findAll({
    attributes: ['continent'],
  })
  .then(r => {
    const continents = [...new Set(r.map(c => c.continent))];    
    res.status(200).send(continents);
  })
  .catch(err => res.status(404).send({ data: err.message }))
};

const getCountriesWhereContinent = async(req, res) => {
  const {nameContinent} = req.query;
  try {
    if(nameContinent === 'all'){
      const allCountries = await Country.findAll()
      res.status(200).send(allCountries)
    }else {
      const countries = await Country.findAll({
        where:{
          continent: nameContinent,
        }
      })
      res.status(200).send(countries);
    }
  } catch (error) {
    res.status(404).send({ data: error.message })
  }
};

const filterCountriesByPopulation = (req, res) => {
  const { typeOrder } = req.query;
  Country.findAll({
    attributes:  ['id', 'name', 'img', 'continent', 'population']
  })
  .then(r => {
    const countries = r.map(c => c.dataValues)
    if(typeOrder === 'all') return res.status(200).send(countries);
    if(typeOrder === 'asc'){
      const filteredCountries = countries.sort((a, b) => a.population - b.population)
      return res.status(200).send(filteredCountries);
    }
    if(typeOrder === 'desc'){
      const filteredCountries = countries.sort((a, b) => b.population - a.population)
      return res.status(200).send(filteredCountries);
    }
  })
  .catch(err => res.status(404).send({ data: err.message }))
}

const allFilters = async (req, res) => {
  const { page } = req.params;
  const { nameActivity, continent, orderPop } = req.query;
  const pag = parseInt(page) || 1
  const limitRend = pag === 1 ? 9 : 10;
  try {
    if(nameActivity) {
      const countries = await Country.findAll({
        include: {
          model: TouristActivity,
          as: "touristActivities",
          through: {
            attributes: []
          }
        },
        where: {
          '$touristActivities.name$': nameActivity,
          continent: continent ? continent : { [Op.not]: null }
        },
        [orderPop && 'order']: [
          orderPop === 'asc'? 
          ['population', 'ASC'] 
          : 
          ['population', 'DESC']
          
        ],
        offset: limitRend * (pag - 1),
        // limit: limitRend,
      })
      res.status(200).send(countries)
    }else {
      const countries = await Country.findAll({
        include: {
          model: TouristActivity,
          through: {
            attributes: []
          }
        },
        where: {
          continent: continent ? continent : { [Op.not]: null }
        },
        [orderPop && 'order']: [
          orderPop === 'asc'? 
          ['population', 'ASC'] 
          : 
          ['population', 'DESC']
          
        ],
        offset: limitRend * (pag - 1),
        limit: limitRend,
      })
      res.status(200).send(countries)
    }
  } catch (error) {
    res.status(400).send({data: error.message})
  }
}

module.exports = {
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
  allFilters
}