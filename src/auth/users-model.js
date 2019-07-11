'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('./roles-model.js');

const TOKEN_EXPIRE = process.env.TOKEN_LIFETIME || '1h';
const SINGLE_USE_TOKENS = !!process.env.SINGLE_USE_TOKENS;
const SECRET = process.env.SECRET || 'shh its a secret';

const usedTokens = new Set();

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

users.methods.generateKey = function () {
  return this.generateToken('key');
};

users.statics.authenticateToken = function (token) {
  if (usedTokens.has(token)) {
    return Promise.reject('Invalid Token');
  }
  try {
    let parsedToken = jwt.verify(token, SECRET);
    (SINGLE_USE_TOKENS) && parsedToken.type !== 'key' && usedTokens.add(token);
    let query = {_id: parsedToken.id };
    return this.findOne(query);
  }
  catch(e) {throw new Error('Invalid Token'); }
};

users.statics.authenticateBasic = function (auth) {
  let query = {username: auth.username };
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(error => {throw error; });
};

users.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};

users.methods.can = function (capability) {
  console.log(`This route requires ${capability} to access. User ${this.username} has ${this.abilities[0].capabilities}`);
  return this.abilities[0].capabilities.includes(capability);
};



module.exports = mongoose.model('users', users);