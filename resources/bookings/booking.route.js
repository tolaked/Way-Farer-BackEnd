const express = require('express');

const { verifyToken, verifyAdminToken } = require('../../utils/validateToken');
const { bookSeat, getAllBookings, getUserBookings, deleteBooking } = require('./booking.controller');

const router = express.Router();

router.post('/create/:tripId', verifyToken, bookSeat);
router.get('/', verifyToken, verifyAdminToken, getAllBookings);
router.get('/mybookings', verifyToken, getUserBookings);
router.delete('/:_id', verifyToken, deleteBooking);

module.exports = router;
