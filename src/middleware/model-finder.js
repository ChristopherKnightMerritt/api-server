'use strict';

module.exports = (req, res, next) => {
  let modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  console.log('MODEL FINDER MODEL NAME:', modelName);
  req.model = require(`../models/${modelName}/${modelName}-model.js`);
  next();
};
