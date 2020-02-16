const express = require('express');

const { verifyToken } = require('../../utils/validateToken');
const { bookSeat } = require('./booking.controller');

const router = express.Router();

router.post('/create/:tripId', verifyToken, bookSeat);

module.exports = router;
