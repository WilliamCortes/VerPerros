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
//require("dotenv").config() // sugerencia de Diego //16-julio-2021 estaba bien y de repente molestó por esta línea
// const axios = require('axios');
// const { Dog, Temperament } = require('./src/db.js');
// Syncing all the models at once.
// const PORT = process.env.PORT || 3001;


// conn.sync({ force: true }).then(() => {
  // server.listen(PORT, () => {
const port_number = process.env.PORT || 3001;
const host = '0.0.0.0';


conn.sync({ force: true }).then(() => {
  server.listen(port_number, host,() => {
    console.log(`%s listening at ${port_number}`); // eslint-disable-line no-console

  })
})


