const Joi = require('joi');

module.exports = { validateBus(trip) {
  const schema = {
    busId: Joi.string()
      .min(2)
      .max(50)
      .required(),

    origin: Joi.string()
      .min(2)
      .max(50)
      .required(),

    destination: Joi.string()
      .min(2)
      .max(50)
      .required(),

    tripDate: Joi.string()
      .min(5)
      .max(30)
      .required(),
    fare: Joi.number()
      .integer()
      .required(),
  };
  return Joi.validate(trip, schema);
},
};
