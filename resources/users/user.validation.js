const Joi = require("joi");

module.exports = {
  validateUser(user) {
    const schema = {
      firstName: Joi.string()
        .min(2)
        .max(50)
        .required(),
      lastName: Joi.string()
        .min(1)
        .max(50)
        .required(),
      email: Joi.string()
        .min(2)
        .max(50)
        .required()
        .email(),
      isAdmin: Joi.string()
        .default("false"),
      password: Joi.string()
        .min(5)
        .max(50)
        .required(),
    };
    return Joi.validate(user, schema);
  },

  validateLogin(user) {
    const schema = {
      email: Joi.string()
        .min(2)
        .max(50)
        .required()
        .email(),
      password: Joi.string()
        .min(5)
        .max(50)
        .required(),
    };
    return Joi.validate(user, schema);
  },

};
