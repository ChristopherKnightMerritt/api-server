'use strict';

const express = require('express');
const app = express();

const errorHandler = require(`./middleware/500.js`)
const notFound = require(`./middleware/404.js`);
const v1Router = require(`./api/v1.js`);

app.use(v1Router);
app.use(notFound);


let start = (port = process.env.PORT) => {
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
};

module.exports = {start};