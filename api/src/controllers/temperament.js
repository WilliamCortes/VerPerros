const { Temperament, Dog } = require('../db');

//Cuando filtro por temperamento

async function getTemperamentDog(name){

    let breeds = await Dog.findAll({
        include: Temperament
      });
    const dogs = [];
    i =0;
    while(dogs.length <8 && i < breeds.length){
        if(breeds[i]?.temperaments[0]?.name.toUpperCase().includes(name)) {
            dogs.push(breeds[i]);
        }
        i++

    }
    return  dogs
}

async function showTemperaments(){
    try {   
        const temperamentsDb = await Temperament.findAll();            
        let totalTemperaments = [];
        for(let i =0; i < temperamentsDb.length; i++){
            totalTemperaments = totalTemperaments.concat(temperamentsDb[i].name?.split(','));
        }
        totalTemperaments = totalTemperaments.map(name => name.trim());

        totalTemperaments = totalTemperaments.filter((temp, i) => {
            return totalTemperaments.indexOf(temp) === i;
        });
        return totalTemperaments

    }catch(error){
        console.log('Error de showTemperaments: ', error);
    }
}

async function getAllTemperaments(req, res, next){
    try{
        let {name} = req.query;
        console.log('getAllTemperaments/ controles vlor de name:',name)
        if(name){
            let apiBreeds = await getTemperamentDog(name.toUpperCase())
            if(apiBreeds.length) return res.json(apiBreeds)
            return res.json('Aún No hay Razas con el temperamento: '+ name)
        }
        const temperaments = await showTemperaments()
        return res.json(temperaments)

    } catch(error){
       return next(error)
    }      
}


module.exports = {
    getAllTemperaments,
}