var supertest = require('supertest-as-promised')(require('../../src/routes'));
// var model = require('../models/Temperamento');


describe('Routes', function() {

  // beforeEach(function() {
  //   model.reset();
  // });

  const response = [
    "Stubborn",
    "Curious",
    "Playful",
    "Adventurous",
    "Active",
    "Fun-loving",
    "Aloof",
    "Clownish",
    "Dignified",
    "Independent",
    "Happy",
    "Wild",
    "Hardworking",
    "Dutiful",
    "Outgoing",
    "Friendly",
    "Alert",
    "Confident",
    "Intelligent",
    "Courageous",
    "Loyal",
    "Brave",
    "Docile",
    "Responsive",
    "Composed",
    "Receptive",
    "Faithful",
    "Loving",
    "Protective",
    "Trainable",
    "Responsible",
    "Energetic",
    "Gentle",
    "Affectionate",
    "Devoted",
    "Assertive",
    "Dominant",
    "Strong Willed",
    "Obedient",
    "Reserved",
    "Kind",
    "Sweet-Tempered",
    "Tenacious",
    "Attentive",
    "Steady",
    "Bold",
    "Proud",
    "Reliable",
    "Fearless",
    "Lively",
    "Self-assured",
    "Cautious",
    "Eager",
    "Good-natured",
    "Spirited",
    "Companionable",
    "Even Tempered",
    "Rugged",
    "Fierce",
    "Refined",
    "Joyful",
    "Agile",
    "Amiable",
    "Excitable",
    "Determined",
    "Self-confidence",
    "Hardy",
    "Calm",
    "Good-tempered",
    "Watchful",
    "Hard-working",
    "Feisty",
    "Cheerful",
    "Sensitive",
    "Easygoing",
    "Adaptable",
    "Trusting",
    "Lovable",
    "Territorial",
    "Keen",
    "Familial",
    "Rational",
    "Bright",
    "Quick",
    "Powerful",
    "Gay",
    "Stable",
    "Quiet",
    "Inquisitive",
    "Strong",
    "Sociable",
    "Patient",
    "Suspicious",
    "Great-hearted",
    "Merry",
    "Vocal",
    "Tolerant",
    "Mischievous",
    "People-Oriented",
    "Bossy",
    "Cunning",
    "Athletic",
    "Boisterous",
    "Cooperative",
    "Trustworthy",
    "Self-important",
    "Respectful",
    "Thoughtful",
    "Generous",
    "Cat-like",
    "Sturdy",
    "Benevolent",
    "Clever",
    "Bubbly",
    "Opinionated",
    "Aggressive",
    "Extroverted",
    "Charming",
    "Unflappable",
    "Spunky",
    "Diligent",
    "Willful",
    "Fast",
    "Vigilant"
    ]

  describe('/temperament', function() {
        it('GET responde con un array con los temperamentos de la Apidogs de entrada', function() {
        return supertest // supertest nos permite hacer y testear requests HTTP
            .get('/temperament') // hacemos un request HTTP: GET a '/temperament'
            .expect(200) // el codigo de status del response
            .expect('Content-Type', /json/) // podemos testear los headers
            .expect(function(res) {
                expect(res.body).toEqual(response); // testeamos la respuesta con el body
            });
        });
    })

    it('GET responde con un array de SÓLO un perro con el temperamento Fun-loving cuando ?name=Fun-loving', function() {
      return supertest
        .get('temperament/?name=Fun-loving')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual([
            {
            id: "2848a34c-55eb-4aef-9d57-59d055791e1c",
            name: "Affenpinscher",
            height: "9 - 11.5",
            weight: "6 - 13",
            years_life: "10 - 12 years",
            image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
            temperaments: [
            {
            id: 1,
            name: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
            dog_temperament: {
            createdAt: "2021-07-21T22:12:01.992Z",
            updatedAt: "2021-07-21T22:12:01.992Z",
            dogId: "2848a34c-55eb-4aef-9d57-59d055791e1c",
            temperamentId: 1
            }
            }
            ]
            }
            ]);
        });
    });
  });









// /* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('chai');
// const session = require('supertest-session');
// const app = require('../../src/app.js');
// const { Dog, conn } = require('../../src/db.js');

// const agent = session(app);
// const dog = {
//   name: 'Pug',
// };

// describe('Videogame routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Dog.sync({ force: true })
//     .then(() => Dog.create(dog)));
//   describe('GET /dogs', () => {
//     it('should get 200', () =>
//       agent.get('/dogs').expect(200)
//     );
//   });
// });
