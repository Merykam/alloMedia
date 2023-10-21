const express = require('express');

const router = express.Router();

const livreurController = require('../controllers/livreurController');

const IsVerified = require('../middlewares/isVerifiedMail');

const IsDelivry = require('../middlewares/isDelivery');

router.get('/dashboard',IsVerified,IsDelivry,livreurController);


module.exports=router;