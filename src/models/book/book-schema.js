'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const book = mongoose.Schema({
  title: {type:String, required:true},
  author: {type:String, required:true},
  genre: {type:String, required:true},
});

module.exports = mongoose.model('book', book);