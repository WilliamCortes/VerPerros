const { default: axios } = require('axios');
const { Temperament } = require('../db');

async function createTemperaments(){
    try{
        temperaments = await axios.get('https://api.thedogapi.com/v1/breeds');
        temperaments = temperaments.data.map( dog => dog.temperament);

        for(let i =0; i<temperaments.length; i++){
            if(temperaments[i]){
              await Temperament.create({ name: temperaments[i] });
            }
          }
        return false;
    }catch(error){
        return(error);
    }

}

async function showTemperaments(){
    const temperamentsDb = await Temperament.findAll();
                
    let totalTemperaments = [];

    for(let i =0; i < temperamentsDb.length; i++){
        totalTemperaments = totalTemperaments.concat(temperamentsDb[i].name?.split(','));
    }
    
    totalTemperaments = totalTemperaments.filter((temp, i) => {
        return totalTemperaments.indexOf(temp) === i;
     });
    return totalTemperaments
}

async function getAllTemperaments(req, res, next){
    try{
        let temperaments = await Temperament.findAll()
        if(!temperaments.length){
            let create = await createTemperaments();
            if(create) return next(create)
        }
        return res.json(await showTemperaments())
    } catch(error){
       return next(error)
    }      
}

module.exports = {
    getAllTemperaments,
    createTemperaments,
}