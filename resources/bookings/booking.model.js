const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookingSchema = Schema({
  userId: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  tripId: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const BookingModel = mongoose.model('Booking', BookingSchema);
module.exports = BookingModel;
