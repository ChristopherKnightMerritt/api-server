'use strict';

const express = require('express');
const router = express.Router();

router.get('/api/v1/test', handleGetAll);
router.get('/api/v1/test/:id', handleGetOne);
router.post('/api/v1/test/', handlePost);
router.put('/api/v1/test/:id', handlePut);
router.delete('/api/v1/test/:id', handleDelete);

function handleGetAll(request, response, next) {
  response.status(200).send('GOt all!');
}

function handleGetOne(request, response, next) {
  response.status(200).send('Got 1!');
}

function handlePost(request, response, next) {
  response.status(200).send('Made a post');
}

function handlePut(request, response, next) {
  response.status(200).send('Made a put');
}

function handleDelete(request, response, next) {
  response.status(200).send('made a delete!');
}

module.exports = router;