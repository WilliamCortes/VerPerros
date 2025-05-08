const { Dog, Temperament } = require('../db');
const { v4: uuidv4 } = require('uuid');



async function AddDog(req,res,next){
    const id = uuidv4();
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Request body is empty' });
    }
    const dogBody ={ ...req.body, id };
    try{
        if( dogBody.name && dogBody.height && dogBody.weight){

            //Validacion para que no se repitan razas con el mismo nombre
            // const nameExist = await dogBreeds(dogBody.name.toUpperCase())
            // console.log('controllers/dog/adddog[0]: ', nameExist[0].name)
            // if(nameExist.length) return res.status(409).json({ error: 'Este nombre ya existe', details: nameExist }) // Example of conflict
            if(!dogBody.image) dogBody.image ='https://i.imgur.com/tc5eTf9.jpg';
            if(!dogBody.years_life) dogBody.years_life = 'No se sabe cuanto puede vivir 📽';
            if(!dogBody.temperaments) dogBody.temperaments ='A esta raza no le añadieron temperamentos 😰';
            
            let temperamentsInput = dogBody.temperaments; 
            let [temperamentInstance] = await Temperament.findOrCreate({ 
                        where: {  name: temperamentsInput  }
                    });
            
            const createDog = await Dog.create(dogBody);
            await createDog.setTemperaments(temperamentInstance);
            return res.status(201).json(createDog);
        }
        res.status(400).json({ error: 'Faltan datos obligatorios: nombre, altura y peso.' });
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
    let i =0;
    while(dogs.length <8 && i < breeds.length){
        if(breeds[i].name.toUpperCase().includes(name)) {
            dogs.push(breeds[i]);
        }
        i++

    }
    return  dogs
}



//Obtiene 8 perros de la db
async function dogsRandom(){ 
    try{
        let result = [];
        let check = new Set();
        const getDogs = await Dog.findAll({
            include: Temperament
          });

        if (getDogs.length === 0) {
            return []; 
        }

        const numDogsToSelect = Math.min(8, getDogs.length); 
        while(result.length < numDogsToSelect){
            let r = Math.floor(Math.random() * getDogs.length);
            if (!check.has(r)) {
                result.push(getDogs[r]);
                check.add(r);
            }
        }
        return result;
    } catch(error){
        console.error('Error in dogsRandom: ', error); 
        throw error;
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
                    height:getDogs[i].height, 
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
                    height:getDogs[i].height, 
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
                height:getDogs[i].height, 
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
        
        let dogRamdon = await dogsRandom()
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

