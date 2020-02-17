const express = require('express');
const { verifyToken, verifyAdminToken } = require('../../utils/validateToken');

const router = express.Router();

const { createTrip, getAllTrips, updateTrip } = require('./tripsController');

router.post('/create', verifyAdminToken, createTrip);
router.get('/', verifyToken, getAllTrips);
router.patch('/:_id', verifyAdminToken, updateTrip);

module.exports = router;
