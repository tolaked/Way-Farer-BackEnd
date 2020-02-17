const express = require('express');

const { verifyToken } = require('../../utils/validateToken');
const { bookSeat, getAllBookings } = require('./booking.controller');

const router = express.Router();

router.post('/create/:tripId', verifyToken, bookSeat);
router.get('/', verifyToken, getAllBookings);

module.exports = router;
