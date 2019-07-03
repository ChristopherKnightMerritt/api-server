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
  });
  it('Should return 200 on a valid get route.',  ()=> {
    return mockRequest
      .get('/api/v1/book')
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
  it('Should return 200 on a valid put route.',  ()=> {
    let obj = {title:'value', author: 'me', genre: 'fiction'};
    return mockRequest
      .put('/api/v1/book/5d1bd0e5a923151ee68b8561')
      .send(obj)
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
  it('Should return 200 on a valid delete route.', () => {
    return mockRequest
      .delete('/api/v1/book/5d1bd0e5a923151ee68b8561')
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
  it('Should return 500 on a server error.',  ()=> {
    return mockRequest
      .post('/api/v1/book')
      .then(res => {
        expect(res.status).toBe(500);
      });
  });
});
