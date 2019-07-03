[![Build Status](https://www.travis-ci.com/ChristopherKnightMerritt/api-server.svg?token=o8q7dbshCkeVPPqdvF9t&branch=master)](https://www.travis-ci.com/ChristopherKnightMerritt/api-server)

# API Server

## Summary:
This is a template backend api server that uses node.js and mongoDB, which can be built on top of to support additional APIs. Mongo models can easily be added to add new endpoints.

### Endpoints:
Current end points:
* /api/v1/book
  * get, post
* /api/v1/book/:id
  * get, put, delete
  

### Adding new models: 
* Create a new folder with the name of the model to add
* Create two files in that folder - one for the model, one for the schema.
* The model needs to extend the generic mongo-model, and additional functionality can be added on this file.
