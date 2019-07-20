[![Build Status](https://www.travis-ci.com/ChristopherKnightMerritt/api-server.svg?token=o8q7dbshCkeVPPqdvF9t&branch=master)](https://www.travis-ci.com/ChristopherKnightMerritt/api-server)

# Generic API Server

## Summary:
This is a template backend api server that uses node.js and mongoDB, which can be built on top of to support additional APIs. Mongo models can easily be added to add new endpoints.

### Link to live server:
https://generic-api-server.herokuapp.com/api/v1/book

### Endpoints:
Current end points:
* GET     ```/api/v1/book/ ```
* POST    ```/api/v1/book/ ```

* GET     ```/api/v1/book/:id```
* POST:   ```/api/v1/book/:id```
* PUT:    ```/api/v1/book/:id```
* DELETE: ```/api/v1/book/:id```

  

### Adding new models: 
* Create a new folder with the name of the model to add
* Create two files in that folder - one for the model, one for the schema.
* The model needs to extend the generic mongo-model, and additional functionality can be added on this file.

Ex: Adding a model for a 'project':
```
Models
│   mongo-model.js  
└─── book
│   │   book-model.js
│   │   book-schema.js 
└─── project
    │   project-model.js
    │   project-schema.js
```
