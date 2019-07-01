'use strict';
console.log('in testmodel');

const Model = require('../mongo-model.js');
const schema = require('./test-schema.js');

class Test extends Model {}

module.exports = new Test(schema);