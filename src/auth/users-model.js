'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('./roles-model.js');

const TOKEN_EXPIRE = process.env.TOKEN_LIFETIME || '1h';
const SECRET = process.env.SECRET || 'shh its a secret';

const users = new mongoose.Schema({
  username: {type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {type: String },
  role: { type: String, default: 'user', enum: ['superuser', 'admin', 'editor', 'user'] },
}, {
  toObject: {virtuals: true},
  toJSON: {virtuals: true},
});

users.virtual('abilities', {
  ref: 'roles',
  localField: 'role',
  foreignField: 'role',
  justOne: false,
});

users.pre('findOne', function () {
  try {
    this.populate('abilities');
  }
  catch (error) { console.log('Find Error', error); }
});


users.pre('save', function(next) {
  console.log('in the presave hook');
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.passeord = hashedPassword;
      next();
    })
    .catch(error => {throw new Error(error); });
});

users.methods.generateToken = function (type) {
  let token = {
    id: this._id,
    type: type || 'user',
  };

  let options = {};
  if(type !== 'key' && !!TOKEN_EXPIRE){
    options = { expiresIn: TOKEN_EXPIRE };
  }
  return jwt.sign(token, SECRET, options);
};

module.exports = mongoose.model('users', users);