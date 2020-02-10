const express = require('express');
const users = require('./users/user.route');
const buses = require('./bus/bus.route');
const trip = require('./trips/trips.route');

const mainRouter = express.Router();

mainRouter.use('/api/v1/users', users);
mainRouter.use('/api/v1/buses', buses);
mainRouter.use('/api/v1/trips', trip);


module.exports = mainRouter;
