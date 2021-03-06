const Joi = require('joi');

module.exports = { validateBus(bus) {
  const schema = {
    manufacturer: Joi.string()
      .min(2)
      .max(50)
      .required(),
    model: Joi.string()
      .min(2)
      .max(50)
      .required(),

    year: Joi.string()
      .min(4)
      .max(4)
      .required(),

    plateNumber: Joi.string()
      .min(5)
      .max(50)
      .required(),

    capacity: Joi.number()
      .integer()
      .min(5)
      .max(30)
      .required(),
  };
  return Joi.validate(bus, schema);
},
};
