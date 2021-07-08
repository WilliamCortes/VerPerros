//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require("dotenv").config() // sugerencia de Diego
const axios = require('axios');
const { Dog, Temperament } = require('./src/db.js');
// Syncing all the models at once.
const PORT = process.env.PORT || 3001;


conn.sync({ force: true }).then(() => {
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
})


  // server.listen(3001, () => {
  server.listen(PORT, () => {
    // console.log('%s listening at 3001'); // eslint-disable-line no-console
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console

  })
