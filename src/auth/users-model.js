'use strict';

const mongoose = require('mongoose');


const users = new mongoose.Schema({
  username: {type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {type: String },
  role: { type: String, default: 'user', enum: ['superuser', 'admin', 'editor', 'user'] },
}, {
  toObject: {virtuals: true};
  toJSON: {virtuals: true},
});

users.virtual('abilities', {
  ref: 'roles',
  localfield: 'role',
  foreignFeild: 'role',
  justOne: false,
});

