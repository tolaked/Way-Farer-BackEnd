const express = require('express');
const users = require('./users/user.route')

const mainRouter = express.Router()

mainRouter.use('/api/v1/users',users)


module.exports = mainRouter