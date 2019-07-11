'use strict';

const express = require('express');

const authRouter = express.Router();

//user model
//auth middleware

//oauth goes here

authRouter.get('/signup', (req, res, next) => {
  res.status(200).send('signup ok');
});

authRouter.get('/signin', (req, res, next) => {
  res.status(200).send('signin ok');
});

module.exports = authRouter;