const express = require('express');

const router = express.Router();

const managerController = require('../controllers/managerController');



router.get('/dashboard',managerController);


module.exports=router;