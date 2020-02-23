/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
const mongoose = require('mongoose');
const supertest = require("supertest");

const UserModel = require('../users.model');
const { testdburl } = require('../../../config/dbConfig');
const app = require("../../../app"); // Link to your server file

const request = supertest(app);

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

  it('create & save user successfully', async (done) => {
    const res = await request.post("/api/v1/users/register").send(userData);
    const validUser = await UserModel.findOne({ email: "tolay@gmail.com" });
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
  it('should login an existing user', async () => {
    const res = await request.post("/api/v1/users/signin")
      .send({ email: "tolay@gmail.com", password: 'Sweetmum' });
    const validUser = await UserModel.findOne({ email: "tolay@gmail.com" });
    const savedUser = await validUser.save();
    expect(res.body.user.id).toBeDefined();
    expect(res.body.user.id).toBe(savedUser._id.toString());
    expect(res.body.user.email).toBe(savedUser.email);
    expect(savedUser.firstName).toBeDefined();
    expect(savedUser.lastName).toBeDefined();
  });
});


async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const wayfarer_test of collections) {
    const collection = mongoose.connection.collections[wayfarer_test];
    await collection.deleteMany();
  }
}
afterAll(async () => {
  await removeAllCollections();
});
