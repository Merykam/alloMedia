const express = require('express');

const router = express.Router();

const managerController = require('../controllers/managerController');

const IsVerified = require('../middlewares/isVerifiedMail');

const IsManager = require('../middlewares/isManager')

router.get('/dashboard',IsVerified,IsManager,managerController);


module.exports=router;