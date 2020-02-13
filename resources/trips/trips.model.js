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
    minlength: 5,
    maxlength: 50,
  },
  status: {
    type: Number,
    required: true,
    default: 'active',
  },
});

const TripModel = mongoose.model('trip', tripSchema);
module.exports = TripModel;
