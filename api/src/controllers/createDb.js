const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const DOGS_API = 172;
const TEMPERAMENTS_TOTAL = 163;

async function createDogs() {
  try {
    let dogApi = await axios.get("https://api.thedogapi.com/v1/breeds");
    dogApi = dogApi?.data;
    for (let i = 0; i < dogApi.length; i++) {
      let id_u = uuidv4();
      let newDog = {
        name: dogApi[i]?.name,
        height: dogApi[i].height.imperial,
        weight: dogApi[i]?.weight.imperial,
        years_life: dogApi[i]?.life_span,
        id: id_u,
        image: `https://cdn2.thedogapi.com/images/${dogApi[i]?.reference_image_id}.jpg `,
      };
      let temperaments = dogApi[i].temperament;

      if (temperaments) {
        temperamentsResult = await Temperament.findOrCreate({
          where: { name: temperaments },
        });
        dogResult = await Dog.create(newDog);
        await dogResult.setTemperaments(temperamentsResult[0]);
      } else {
        await Dog.create(newDog);
      }
    }
    return true;
  } catch (error) {
    return console.log("Error de createDogs: ", error);
  }
}

async function createDb() {
  try {
    const dogDb = await Dog.findAll();
    if (dogDb.length === 0) {
      const dogsInit = await createDogs();
      const temperaments = await Temperament.findAll();
      if (temperaments.length >= TEMPERAMENTS_TOTAL) {
        const dogs = await Dog.findAll();
        if (dogs.length >= DOGS_API) {
          console.log("createDb con éxito");
          return true;
        }
      }
    } else {
      return true;
    }
  } catch (error) {
    console.logb("Error de create Db", error);
  }
}

module.exports = {
  createDb,
};
