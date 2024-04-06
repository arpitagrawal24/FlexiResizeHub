const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// API to get all data
router.get('/getData', apiController.getData);

// API to add new data
router.post('/addData', apiController.addData);

// API to update existing data
router.put('/editData/:id', apiController.editData);

// API to get count of add and update operations
router.get('/count', apiController.getCount);

module.exports = router;
