// async function createTemperaments(){
//     try{
//         temperaments = await axios.get('https://api.thedogapi.com/v1/breeds');
//         temperaments = temperaments.data.map( dog => dog.temperament);
//         console.log('temperaments de la api: ',temperaments.length)

//         for(let i =0; i<temperaments.length; i++){
//             if(temperaments[i]){
//               await Temperament.create({ name: temperaments[i] });
//             }
//           }
//         return false;
//     }catch(error){
//         return(error);
//     }

// }

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


// function dogApiId(){
    // LLamando a al api
        // if(req.params.id.toString().length <= 3){
        // const dogApi = await axios.get(`https://api.thedogapi.com/v1/breeds/${req.params.id}`);
        // if(!Object.keys(dogApi.data).length) return res.json('Id no válido')
        // return res.json(dogApi.data)
        // }
// }

async function createTemperaments(){
    try{
        let dogs = await axios.get('https://api.thedogapi.com/v1/breeds');
        let temperaments = dogs.data.map( dog => dog.temperament);

        let totalTemperaments = [];
    
        for(let i =0; i < temperaments.length; i++){
            let names = temperaments[i]?.split(',')
            if(names){
                totalTemperaments = totalTemperaments.concat(names);
            }
        }

        totalTemperaments = totalTemperaments.filter((temp, i) => {
            return totalTemperaments.indexOf(temp) === i;
         });

        for(let i =0; i<totalTemperaments.length; i++){
            if(totalTemperaments[i]){
              await Temperament.create({ name: totalTemperaments[i].trim() });
            }
          }
        console.log('Temperamentos creados con éxito');
        return true;
    }catch(error){
        console.log('Error de createTemperaments: ',error);
    }
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
        const getDogs = await Dog.findAll();
        return res.json(getDogs.slice(count, count+8))

        
    } catch(error){
        next(error)
    }
}


// functions de internet

// Get all breeds or breed by name

// // Get breed by id
// router.get('/dogs/:id', async function (req, res) {
//     var { id } = req.params;
//     try {
//         Breed.findByPk(id, {
//             include: Temperament
//         }).then(r => {
//             r ? res.send(r) : res.send({ message: `Could not get breed with id: ${id}` })
//         })
//     }
//     catch (err) {
//         res.send(err)
//     }
// });

// // Get temperaments
// router.get('/temperaments', async function (req, res) {

//     try {
//         Temperament.findAll({ order: [['name', 'asc']] }).then(r => {
//             r.length ? res.send(r) : res.send({ message: 'Could not get temperaments' })
//         })
//     }
//     catch (err) {
//         res.send(err)
//     }

// })


// // Create a new breed
// router.post('/dogs', async function (req, res) {
//     const { name, height, weight, years_life, temperament } = req.body;

//     try {
//         Breed.create({
//             name,
//             height,
//             weight,
//             years_life,
//             image: 'https://i.imgur.com/e8ObQUx.jpg'
//         })
//             .then(breed => breed.setTemperaments(temperament))
//             .then(r => res.send({ message: 'New breed created successfully' }))
//     } catch (err) {
//         console.log(err.message);
//     }
// });

//Archivos de l index en internet

  // Temperamentos
  // let temp = new Set();
  // axios.get('https://api.thedogapi.com/v1/breeds')
  //   .then(response => response.data)
  //   .then(json => {
  //     json && json.forEach(breed => {
  //       let temps = breed.temperament && breed.temperament.split(', ');
  //       temps && temps.forEach(t => temp.add(t));
  //     })
  //     let arrayTemp = Array.from(temp)
  //     Temperament.bulkCreate(arrayTemp.map(t => ({ name: t })))
  //   })
  //   .then(temperaments => console.log('Temperaments created successfully'))
  //   .catch(err => console.error(err));

  // // Razas
  // axios.get('https://api.thedogapi.com/v1/breeds')
  //   .then(response => response.data)
  //   .then(async json => {
  //     json && json.forEach(breed => {
  //       Dog.create({
  //         name: breed.name || 'Could not get name',
  //         weight: breed.weight.metric || 'Could not get weight',
  //         height: breed.height.metric || 'Could not get height',
  //         years_life: breed.life_span || 'Could not get life span',
  //         image: breed.image.url || 'https://i.imgur.com/e8ObQUx.jpg',
  //       })
  //         .then(b => {
  //           let breedTemp = breed.temperament && breed.temperament.split(', ');
  //           breedTemp?.forEach(bt => {
  //             Temperament.findOne({
  //               where: {
  //                 name: bt
  //               }
  //             })
  //               .then(t => {
  //                 b.addTemperament(t?.dataValues.id)
  //               })
  //           })
  //         })
  //     })
  //   })
  //   .then(breeds => console.log('Breeds created successfully'))
  //   .catch(err => console.error(err));


