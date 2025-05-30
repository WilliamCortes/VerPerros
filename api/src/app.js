const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors')
require('dotenv').config();
require('./db.js');

const { ALLOW_ORIGIN } = process.env

const server = express();

server.use(cors())
server.use(morgan('dev'));
server.use(cookieParser());

server.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', ALLOW_ORIGIN || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(express.json())

server.use('/', routes)

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


module.exports = server;
