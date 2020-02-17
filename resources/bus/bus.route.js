const express = require('express');
const { verifyToken, verifyAdminToken } = require('../../utils/validateToken');

const router = express.Router();

const { addBus, getAllBuses } = require('./busController');

router.post('/addbus', verifyAdminToken, addBus);
router.get('/', verifyToken, getAllBuses);

module.exports = router;
