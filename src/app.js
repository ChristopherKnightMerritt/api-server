'use strict';

const express = require('express');
const app = express();



let start = (port = process.env.PORT) => {
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
};

module.exports = {start};