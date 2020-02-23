/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
const mongoose = require('mongoose');
const UserModel = require('../users.model');
const { testdburl } = require('../../../config/dbConfig');

const userData = {
  firstName: 'Tola',
  lastName: 'Akere',
  email: 'tolay@gmail.com',
  password: 'Sweetmum',

};

describe('user model test', () => {
  // connect to the MongoDB Memory Server by using mongoose.connect
  beforeAll(async () => {
    await mongoose.connect(testdburl, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        process.exit(1);
      }
    });
  });

  it('create & save user successfully', async () => {
    const validUser = new UserModel(userData);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.firstName).toBe(userData.firstName);
    expect(savedUser.lastName).toBe(userData.lastName);
    expect(savedUser.email).toBe(userData.email);
  });

  it('should throw an error', async () => {
    const validUser = new UserModel({ firstName: 'Tola',
      lastName: 'Akere',
      email: 'tola@gmail.com',
      password: 'Sweetmum' });
    const savedUser = await validUser.save();
    expect(savedUser.nickname).toBeUndefined();
  });
  it('create user without required field should fail', async () => {
    const userWithoutRequiredField = new UserModel({ firstName: 'TekLoon' });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      err = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.lastName).toBeDefined();
  });
  it('create user with existing email', async () => {
    const userWithoutRequiredField = new UserModel(userData);
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      err = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.code).toBe(11000);
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
