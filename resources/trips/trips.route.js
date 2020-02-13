const express = require('express');
const { verifyToken } = require('../../utils/validateToken');

const router = express.Router();

const { createTrip, getAllTrips } = require('./tripsController');

router.post('/create', verifyToken, createTrip);
router.get('/', verifyToken, getAllTrips);

module.exports = router;
