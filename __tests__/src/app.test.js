'use strict';

const supergoose = require('../supergoose.js');
const {server} = require('../../src/app.js');
const mockRequest = supergoose.server(server);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('API Server', () => {
  it('Should return 404 on an invalid route.',  ()=> {
    return mockRequest
      .get('/foo')
      .then(res => {
        expect(res.status).toBe(404);
      });
  })
});
