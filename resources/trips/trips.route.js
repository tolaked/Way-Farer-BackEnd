const express = require('express');
const { verifyToken } = require('../../utils/validateToken');

const router = express.Router();

const { createTrip, getAllTrips, updateTrip } = require('./tripsController');

router.post('/create', verifyToken, createTrip);
router.get('/', getAllTrips);
router.patch('/:_id', updateTrip);

module.exports = router;
