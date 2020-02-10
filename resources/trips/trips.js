const Trip = require('./trips.model');
const Bus = require('../bus/bus.model');

const createTrip = async (req, res) => {
  const { busId, origin, destination, tripDate, fare, status } = req.body;
  try {
    const bus = await Bus.findOne({ busId });

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

module.exports = { createTrip };
