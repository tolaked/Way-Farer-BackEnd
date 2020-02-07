const express = require('express');
const router = express.Router()

const { addBus } = require('./busController');

router.post('/addbus',addBus)

module.exports = router                                                                                                                                                                                                                                                                                                                                                                              