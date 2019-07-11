'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const errorHandler = require(`./middleware/500.js`);
const notFound = require(`./middleware/404.js`);
const authRouter = require('./auth/router.js');
const v1Router = require(`./api/v1.js`);
const populateRoles = require('./middleware/populate-roles.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(authRouter);
app.use(v1Router);
app.use(notFound);
app.use(errorHandler);


let start = (port = process.env.PORT) => {
  app.listen(port, () => {
    console.log(`listening on ${port}`);
    app.post('/roles', populateRoles);
  });
};

module.exports = {
  server: app,
  start,
};