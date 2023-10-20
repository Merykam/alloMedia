const express = require('express');

const router = express.Router();

const clientController = require('../controllers/clientController');



router.get('/dashboard',clientController);

module.exports=router;