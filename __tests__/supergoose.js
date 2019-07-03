'use strict';

const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').default;
const supertest = require('supertest');

let mongoServer;

let supergoose = module.exports = {};
supergoose.server = (server) => supertest(server);

supergoose.startDB = async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();

  const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
  };

  await mongoose.connect(mongoUri, mongooseOptions, (err) => {
    if (err) console.error(err);
  });
};

supergoose.stopDB = () => {
  mongoose.disconnect();
  mongoServer.stop();
};

describe('supergoose', () => {
  it('Supergoose works', () => {
    expect(true).toBeTruthy();
  });
});

