const express = require('express');

const router = express.Router();

const livreurController = require('../controllers/livreurController');



router.get('/dashboard',livreurController);


module.exports=router;