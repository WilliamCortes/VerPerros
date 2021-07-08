const { Dog } = require('../db');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { createTemperaments } = require('./temperament');


async function AddDog(req,res,next){
    const id = uuidv4();
    const dogBody ={ ...req.body, id };
    if(!dogBody) return res.send('Che no viene nada');
    try{
        if( dogBody.name && dogBody.height && dogBody.weight){
            const createDog = await Dog.create(dogBody);
            return res.json(createDog);
        }
        res.send('Che te faltan datos')
    }catch (error){
        next(error);
    }
}

// async function dogBreeds(name){
//     let breeds = await axios.get('https://api.thedogapi.com/v1/breeds');
//     breeds = breeds.data
//     const dogs = []
//      i =0
//     while(dogs.length <8 && i < breeds.length){
//         if(breeds[i].name.includes(name)) {
//             dogs.push(breeds[i])
//         }
//         i++

//     }
//     return  dogs
// }

// async function getAllDogs(req, res, next){
//     try{
//         let {name} = req.query;
//         if(name){
//         let apiBreeds = await dogBreeds(name)
//         if(apiBreeds.length) return res.json(apiBreeds)
//         return res.json('No hay Razas con el nombre: '+ name)
//         }
//     } catch(error){
//         next(error)
//     }
//     let count=0
//     const dogApi = axios.get('https://api.thedogapi.com/v1/breeds');
//     const dogDb = Dog.findAll();
//     Promise.all([dogApi, dogDb])
//         .then( response => {
//             let[dogApiResponse, dogDbResponse] = response;
//             let totalDogs=dogDbResponse.concat(dogApiResponse.data.splice( count, count+8 ));
//             count++;
//             return  res.json( totalDogs);
//             })
//         .catch( err => next(err));       
// }


//funcion para ingresar a la db en proceso



async function dogBreeds(name){

    let breeds = await Dog.findAll();
    const dogs = []
     i =0
    while(dogs.length <8 && i < breeds.length){
        if(breeds[i].name.toUpperCase().includes(name)) {
            dogs.push(breeds[i])
        }
        i++

    }
    return  dogs
}


async function createDogs(){
    try{
        let dogApi = await axios.get('https://api.thedogapi.com/v1/breeds');
        dogApi = dogApi.data 
        for(let i =0; i<dogApi.length; i++){
            let id_u = uuidv4();
            let newDog ={
                name: dogApi[i].name,
                height: dogApi[i].height.imperial,
                weight: dogApi[i].weight.imperial,
                years_life: dogApi[i].life_span,
                id: id_u,
                image: dogApi[i].image.url
            }
            await Dog.create(newDog);
        }
        const dogsDb = await Dog.findAll()
        return dogsDb.slice(0,8)
    }
    catch(error){
        return error
    }
}


async function getAllDogs(req, res, next){
    try{
        let {name} = req.query;
        if(name){
            let apiBreeds = await dogBreeds(name.toUpperCase())
            if(apiBreeds.length) return res.json(apiBreeds)
            return res.json('Aún No hay Razas con el nombre: '+ name)
        }
        
        const dogDb = await Dog.findAll()
        if(dogDb.length < 100){
            const createDog = await createDogs();
            const temperaments = await createTemperaments()
            if(temperaments) return next(temperaments)

            return res.json(createDog);
        } 
        let count = 8;
;       const getDogs = await Dog.findAll();
        return res.json(getDogs.slice(count, count+8))

        
    } catch(error){
        next(error)
    }
}

async function getDog(req, res, next){
    try{
        // LLamando a al api
        // if(req.params.id.toString().length <= 3){
        // const dogApi = await axios.get(`https://api.thedogapi.com/v1/breeds/${req.params.id}`);
        // if(!Object.keys(dogApi.data).length) return res.json('Id no válido')
        // return res.json(dogApi.data)
        // }
        if(req.params.id.toString().length === 36 ){
            const dogDb = await Dog.findByPk(req.params.id);//Traer por el id de la d_b findByPk(id)
            if(dogDb) return res.json(dogDb)
            return res.send('Id no encontrado')
        }
        res.send('Id no válido')
    } catch (error){
            next(error)
    }
}

module.exports = {
    AddDog,
    getAllDogs,
    getDog,
}

