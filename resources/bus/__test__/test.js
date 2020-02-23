/* eslint-disable max-len */
const mongoose = require('mongoose');
const supertest = require("supertest");

const UserModel = require('../../users/users.model');
const BusModel = require('../bus.model');
const { testdburl } = require('../../../config/dbConfig');
const app = require("../../../app"); // Link to your server file

const request = supertest(app);

const busData = {
  manufacturer: 'Honda',
  plateNumber: '500-BQ-FKJ',
  model: 'civic',
  year: '2006',
  capacity: 10,

};

const invalidbusData = {
  manufacturer: 'Honda',
  model: 'civic',
  year: '2006',
  capacity: 10,

};

const userData = {
  firstName: 'Akin',
  lastName: 'Adeola',
  email: 'adeola@yahoo.com',
  isAdmin: true,
  password: 'Sweetmum',

};
let token;
describe('bus model test', () => {
  // connect to the MongoDB Memory Server by using mongoose.connect
  beforeAll(async () => {
    await mongoose.connect(testdburl, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        process.exit(1);
      }
    });
  });

  it('create & save user successfully', async (done) => {
    const res = await request.post("/api/v1/users/register").send(userData);
    token = res.body.user.token;
    const validUser = await UserModel.findOne({ email: "adeola@yahoo.com" });
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.firstName).toBe(userData.firstName);
    expect(savedUser.lastName).toBe(userData.lastName);
    expect(savedUser.email).toBe(userData.email);
    expect(res.body.user.email).toBe(savedUser.email);
    expect(res.body.user.id).toBe(savedUser._id.toString());
    done();
  });

  it('create & save a new bus successfully', async (done) => {
    const res = await request.post("/api/v1/buses/addbus")
      .send(busData)
      .set('authorization', token);
    const validBus = await BusModel.findOne({ plateNumber: busData.plateNumber });
    expect(res.body).toBeDefined();
    expect(res.body.bus.plateNumber).toBe(validBus.plateNumber);
    expect(res.body.bus.manufacturer).toBe(validBus.manufacturer);
    expect(res.body.bus.year).toBe(validBus.year);

    done();
  });

  it('should throw an error if required fields are not filled', async () => {
    const res = await request.post("/api/v1/buses/addbus")
      .send(invalidbusData)
      .set('authorization', token);
    expect(res.body).toBeDefined();
    expect(res.body.message).toBe('"plateNumber" is required');
  });
});


async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

afterAll(async () => {
  await removeAllCollections();
});
