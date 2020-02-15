const mongoose = require('mongoose');

const { Schema } = mongoose;

const tripSchema = Schema({
  busId: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  origin: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  destination: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  tripDate: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  fare: {
    type: Number,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  bookings: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: 'active',
  },
});

const TripModel = mongoose.model('trip', tripSchema);
module.exports = TripModel;
