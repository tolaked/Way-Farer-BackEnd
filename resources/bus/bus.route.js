const express = require('express');
const { verifyToken } = require('../../utils/validateToken');

const router = express.Router();

const { addBus, getAllBuses } = require('./busController');

router.post('/addbus', addBus);
router.get('/', verifyToken, getAllBuses);

module.exports = router;
