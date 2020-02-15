const mongoose = require('mongoose');

const { Schema } = mongoose;

const BusSchema = Schema({
  manufacturer: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
  },
  plateNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50,
  },
  model: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,

  },
  year: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  capacity: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
});

const BusModel = mongoose.model('Bus', BusSchema);
module.exports = BusModel;
