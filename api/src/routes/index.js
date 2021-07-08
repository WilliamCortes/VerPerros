const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require('./dogs')
const temperamentRouter = require('./temperament')
const { Op } = require('sequelize');
const { createDb } = require('../controllers/createDb');
//const axios = require('axios');



const router = Router();

router.use("/", function (_req, _res, next) {
    createDb();
    next();
  });

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRouter);
router.use('/temperament', temperamentRouter);
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


module.exports = router;
