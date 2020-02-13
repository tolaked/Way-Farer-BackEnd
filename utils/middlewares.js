const helmet = require('helmet');
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

module.exports = function expressMiddlewares(app) {
  app.use(morgan('combined'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(helmet());
  app.use(cors());
};
