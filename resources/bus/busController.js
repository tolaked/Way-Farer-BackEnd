const Bus = require('./bus.model');
const validation = require('./busValidation');

const addBus = async (req, res) => {
  try {
    const { error } = validation.validateBus(req.body);
    if (error) {
      return res.status(422).json({
        message: error.details[0].message,
      });
    }
    const { plateNumber, year, manufacturer, model, capacity } = req.body;

    let doc = await Bus.findOne({ plateNumber });
    if (doc) {
      return res.status(409).json({
        message: 'Bus already exists',
      });
    }

    doc = new Bus({
      plateNumber,
      year,
      manufacturer,
      model,
      capacity,
    });
    await doc.save();

    return res.status(201).json({
      message: 'Bus added successfuly',
      bus: doc,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: `see ${error.message}` || 'Something went wrong',
    });
  }
};

// eslint-disable-next-line consistent-return
const getAllBuses = (req, res) => {
  try {
    Bus.find(({}, (err, buses) => {
      if (buses.length === 0) {
        return res.status(404).json({
          message: 'no bus found',
        });
      }
      return res.status(200).json({ message: `${buses.length} bus(es) found`,
        buses });
    }));
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Something went wrong',
    });
  }
};

module.exports = { addBus, getAllBuses };
