'use strict';

const express = require('express');
const authRouter = express.Router();
const User = require('./users-model.js');

//auth middleware

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

authRouter.get('/signin', (req, res, next) => {
  res.status(200).send('signin ok');
});

module.exports = authRouter;