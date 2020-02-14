const Trip = require('./trips.model');
const Bus = require('../bus/bus.model');

const createTrip = async (req, res) => {
  const { busId, origin, destination, tripDate, fare, status } = req.body;
  try {
    const bus = await Bus.findOne({ _id: busId });

    if (!bus) {
      return res.status(404).json({
        message: 'Bus not found',
      });
    }

    let doc = await Trip.findOne({ busId });

    if (doc && (doc.tripDate === tripDate)) {
      return res.status(409).json({
        message: 'This bus has already been booked for a trip on the same date',
      });
    }

    doc = new Trip({
      busId,
      origin,
      destination,
      tripDate,
      fare,
      status,
    });
    await doc.save();
    return res.status(201).json({
      message: 'Trip created successfully',
      tripDetails: doc,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Something went wrong',
    });
  }
};

const getAllTrips = (req, res) => {
  try {
    Trip.find(({}, (err, trips) => {
      if (trips.length === 0) {
        return res.status(404).json({
          message: 'no bus found',
        });
      }
      return res.status(200).json({ message: `${trips.length} trip(s) found`,
        trips });
    }));
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Something went wrong',
    });
  }
};

// eslint-disable-next-line consistent-return
const updateTrip = async (req, res) => {
  const updateparamters = req.body;
  const { _id } = req.params;
  try {
    const trip = await Trip.find({ _id });
    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found',
      });
    }
    if (trip && (trip.status === 'cancelled')) {
      return res.status(409).json({
        message: 'This trip is not active',
      });
    }

    const updatedTrip = await Trip.update({ _id },
      { $set: updateparamters });
    if (updatedTrip) {
      return res.status(200).json({
        message: 'Trip updated successfully',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Something went wrong',
    });
  }
};

module.exports = { createTrip, getAllTrips, updateTrip };
