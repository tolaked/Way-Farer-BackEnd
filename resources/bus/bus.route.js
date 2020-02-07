const express = require('express');
const router = express.Router()

const { addBus,getAllBuses } = require('./busController');

router.post('/addbus',addBus);
router.get('/',getAllBuses)

module.exports = router                                                                                                                                                                                                                                                                                                                                                                              