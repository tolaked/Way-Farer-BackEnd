const mongoose = require('mongoose');
const supertest = require('supertest');

const TripModel = require('../trips.model');
const { testdburl } = require('../../../config/dbConfig');
const app = require("../../../app");
const UserModel = require('../../users/users.model');
const BusModel = require('../../bus/bus.model');

const request = supertest(app);

let token;
let busId;
let tripId;

const userData = {
  firstName: 'Akin',
  lastName: 'Adeola',
  email: 'adeola@yahoo.com',
  isAdmin: true,
  password: 'Sweetmum',

};

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
    busId = res.body.bus._id.toString();
    const validBus = await BusModel.findOne({ plateNumber: busData.plateNumber });
    expect(res.body).toBeDefined();
    expect(res.body.bus.plateNumber).toBe(validBus.plateNumber);
    expect(res.body.bus.manufacturer).toBe(validBus.manufacturer);
    expect(res.body.bus.year).toBe(validBus.year);

    done();
  });

  it('create & save a trip successfully', async (done) => {
    const res = await request.post("/api/v1/trips/create").send({
      busId,
      origin: 'Oyo',
      destination: 'Abuja',
      tripDate: '02-04-2020',
      fare: 5000 })
      .set('authorization', token);
    const validTrip = await TripModel.findOne({ busId });
    const savedTrip = await validTrip.save();
    tripId = savedTrip._id.toString();
    expect(res.body).toBeDefined();
    expect(savedTrip).toBeDefined();
    expect(res.body.tripDetails.bookings).toBe(savedTrip.bookings);
    done();
  });

  it('should successfully update a trip', async () => {
    const res = await request.patch(`/api/v1/trips/${tripId}`)
      .send({ origin: 'Ogun' })
      .set('authorization', token);
    expect(res.body).toBeDefined();
    expect(res.body.message).toBe('Trip updated successfully');
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
