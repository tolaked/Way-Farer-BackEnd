/* eslint-disable max-len */
const mongoose = require('mongoose');
const BusModel = require('../bus.model');
const { testdburl } = require('../../../config/dbConfig');

const busData = {
  manufacturer: 'Honda',
  plateNumber: '500-BQ-FKJ',
  model: 'civic',
  year: '2006',
  capacity: 10,

};

describe('user model test', () => {
  // connect to the MongoDB Memory Server by using mongoose.connect
  beforeAll(async () => {
    await mongoose.connect(testdburl, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  it('create & save a new bus successfully', async () => {
    const validBus = new BusModel(busData);
    const savedBus = await validBus.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedBus._id).toBeDefined();
    expect(savedBus.plateNumber).toBe(busData.plateNumber);
    expect(savedBus.manufacturer).toBe(busData.manufacturer);
    expect(savedBus.year).toBe(busData.year);
  });

  it('create & save user successfully', async () => {
    const validBus = new BusModel(busData);
    const savedBus = await validBus.save();
    expect(savedBus._id).toBeDefined();
    expect(savedBus.plateNumber).toBe(busData.plateNumber);
    expect(savedBus.manufacturer).toBe(busData.manufacturer);
    expect(savedBus.year).toBe(busData.year);
    expect(savedBus.nickname).toBeUndefined();
  });
  it('create user without required field should failed', async () => {
    const userWithoutRequiredField = new BusModel({ manufacturer: 'TekLoon' });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      err = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.plateNumber).toBeDefined();
  });
});


async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

afterEach(async () => {
  await removeAllCollections();
});
