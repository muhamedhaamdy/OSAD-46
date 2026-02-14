const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/destock/:id', stockController.destock);
router.get('/restock/:id', stockController.restock);

module.exports = router;