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
    const { tripDate } = trip;
    const { busId } = trip;
    const booking = new Booking({
      tripId, userId, allocatedSeat, tripDate, busId,
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

const getAllBookings = (req, res) => {
  try {
    Booking.find({}, (err, bookings) => {
      if (bookings.length === 0) {
        return res.status(404).json({
          message: 'no bookings found',
        });
      }

      return res.status(200).json({ message: `${bookings.length} booking(s) found`,
        bookings });
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Something went wrong',
    });
  }
};

const getUserBookings = (req, res) => {
  const userId = req.decodedToken.id;
  try {
    Booking.find({ userId }, (err, bookings) => {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong',
        });
      }
      if (bookings.length === 0) {
        return res.status(404).json({
          message: 'no bookings found',
        });
      }

      return res.status(200).json({ message: `${bookings.length} booking(s) found`,
        bookings });
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Something went wrong',
    });
  }
};

const deleteBooking = (req, res) => {
  const { _id } = req.params;
  const { id } = req.decodedToken;
  try {
    Booking.findOne({ _id }, (err, booking) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }
      if (!booking) {
        return res.status(500).json({
          message: 'booking not found',
        });
      }
      if (booking.userId !== id) {
        return res.status(403).json({
          message: 'Sorry, you cant delete this booking',
        });
      }
      Booking.deleteOne({ _id }, (error) => {
        if (error) {
          return res.status(500).json({
            message: error,
          });
        }
      });
      return res.status(200).json({
        message: 'Booking deleted successfully',
      });
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};
module.exports = { bookSeat, getAllBookings, getUserBookings, deleteBooking };
