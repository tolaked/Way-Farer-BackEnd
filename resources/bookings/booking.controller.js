/* eslint-disable consistent-return */
const Trip = require('../trips/trips.model');
const Booking = require('./booking.model');

const bookSeat = async (req, res) => {
  const { tripId } = req.params;
  const userId = req.decodedToken.id;
  try {
    const trip = await Trip.findOne({ _id: tripId });
    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found',
      });
    }

    if (trip && (trip.availableSeats.length === 0)) {
      return res.status(409).json({
        message: 'Sorry, all seats have been booked',
      });
    }
    const allSeats = trip.availableSeats;
    const allocatedSeat = allSeats[0];
    const booking = new Booking({
      tripId, userId, allocatedSeat,
    });

    const newbooking = trip.bookings + 1;
    allSeats.splice(0, 1);
    const newSeats = allSeats;

    await booking.save((err) => {
      if (err) {
        return res.status(500).json({
          error: err || 'Ooops, something went wrong',
        });
      }
    });
    await Trip.updateOne({ _id: tripId },
      { $set: { bookings: newbooking, seats: newSeats } });

    return res.status(201).json({
      message: 'seat booked successfully',
      info: booking,
    });
  } catch (error) {
    return res.status(500).json({
      error: error || 'Something went wrong',
    });
  }
};

module.exports = { bookSeat };
