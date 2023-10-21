const express = require('express');

const router = express.Router();

const clientController = require('../controllers/clientController');
const authenticateJWT= require('../middlewares/auth');
const IsVerified = require('../middlewares/isVerifiedMail');




router.get('/dashboard',IsVerified,authenticateJWT,clientController);

module.exports=router;