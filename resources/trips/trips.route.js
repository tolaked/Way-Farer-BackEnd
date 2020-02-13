const express = require('express');
const { verifyToken } = require('../../utils/validateToken');

const router = express.Router();

const { createTrip } = require('./trips');

router.post('/create', verifyToken, createTrip);

module.exports = router;
