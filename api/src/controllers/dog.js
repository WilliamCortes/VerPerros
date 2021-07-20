const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

//Encargada del post

// async function AddDog(req,res,next){
//     const id = uuidv4();
//     const dogBody ={ ...req.body, id };
//     if(!dogBody) return res.send('Che no viene nada');
//     try{
//         if( dogBody.name && dogBody.height && dogBody.weight){
//             const createDog = await Dog.create(dogBody);
//             return res.json(createDog);
//         }
//         res.send('Che te faltan datos')
//     }catch (error){
//         next(error);
//     }
// }
async function AddDog(req,res,next){
    const id = uuidv4();
    const dogBody ={ ...req.body, id };
    if(!dogBody) return res.send('Che no viene nada');
    try{
        if( dogBody.name && dogBody.height && dogBody.weight){
            
            if(!dogBody.image) dogBody.image ='https://i.imgur.com/tc5eTf9.jpg'
            if(!dogBody.years_life) dogBody.years_life = 'No se sabe cuanto puede vivir 📽'
            if(!dogBody.temperaments) dogBody.temperaments ='A esta raza no le añadieron temperamentos 😰'
            
            let temperaments = dogBody.temperaments            
            let temperamentsResult = await  Temperament.findOrCreate({
                        where: {  name: temperaments  }
                    })
            
            const createDog = await Dog.create(dogBody);
            await createDog.setTemperaments(temperamentsResult[0])
            return res.json(createDog);
        }
        res.send('Che te faltan datos')
    }catch (error){
        next(error);
    }
}

//Cuando el requets es por query

async function dogBreeds(name){

    let breeds = await Dog.findAll({
        include: Temperament
      });
    const dogs = [];
    i =0;
    while(dogs.length <8 && i < breeds.length){
        if(breeds[i].name.toUpperCase().includes(name)) {
            dogs.push(breeds[i]);
        }
        i++

    }
    return  dogs
}



//Obtiene 8 perros de la db

async function dogsRamdon(){
    try{
        let result = [];
        let check =[];
        const getDogs = await Dog.findAll({
            include: Temperament
          });
        for(let i = 0; i<8; i++){
            let r = Math.floor(Math.random()*(getDogs.length))
            !check.includes(r) ? result.push(getDogs[r]) && check.push(r) : i--;
        }
        return result
    } catch(error){
        console.log('Error de dogsRamdon: ', error)
    }    
}

//cuando me pasan por query= ?todas para ver todas las razas

async function getAllDogsOrder(){
    try{
        const result =[]
        const getDogs = await Dog.findAll({ order: [['name', 'ASC']]});
        for(let i = 0; i<getDogs.length; i++){
            if(i === 0){
                result.push({ 
                    id: getDogs[i].id, 
                    name: getDogs[i].name, 
                    weight: getDogs[i].weight,
                    image: getDogs[i].image,
                    next_id: getDogs[i+1].id,
                    previous_id: false,
                    })
                continue

            }  
            if(i === getDogs.length-1){
                result.push({ 
                    id: getDogs[i].id, 
                    name: getDogs[i].name, 
                    weight: getDogs[i].weight,
                    image: getDogs[i].image,
                    next_id: false,
                    previous_id: getDogs[i-1].id
                    })
                continue
            }//  ||
            result.push({ 
                id: getDogs[i].id, 
                name: getDogs[i].name, 
                weight: getDogs[i].weight,
                image: getDogs[i].image,
                next_id: getDogs[i+1].id,
                previous_id: getDogs[i-1].id
                })
        }
        return result
    } catch(error){
        console.log('Error de getAllDogsOrder: ', error)
    }   
}

//Request de todos las razas

async function getAllDogs(req, res, next){
    try{
        let {name,  todas} = req.query;
        if(name){
            let apiBreeds = await dogBreeds(name.toUpperCase())
            if(apiBreeds.length) return res.json(apiBreeds)
            return res.json('Aún No hay Razas con el nombre: '+ name)
        }
        if(todas){
            let dogsOrder = await getAllDogsOrder()
            if(dogsOrder) return res.json(dogsOrder)
        } 
        
        let dogRamdon = await dogsRamdon()
        return res.json(dogRamdon)
        
    } catch(error){
        next(error)
    }
}

//Optiene un dog por el id por params

async function getDog(req, res, next){
    try{
        
        if(req.params.id.toString().length === 36 ){
            const dogDb = await Dog.findByPk(req.params.id,{
                include: Temperament
              });
            if(dogDb){
                dogDb.temperaments= dogDb.temperaments[0].name;
                return res.json(dogDb)
            } 
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

