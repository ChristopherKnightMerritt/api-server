'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const test = mongoose.Schema({
  name: {type:String, required:true},
});

module.exports = mongoose.model('test', test);