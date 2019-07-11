'use strict';

const express = require('express');
const authRouter = express.Router();
const User = require('./users-model.js');
const auth = require('./middleware.js');


//oauth goes here

authRouter.post('/signup', (req, res, next) => {
  console.log('in authrouter post', req.body);
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      console.log('in the .then');
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    })
    .catch(next);
});

authRouter.post('/signin', auth(), (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

module.exports = authRouter;