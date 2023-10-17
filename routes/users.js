const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const users = new userController;

router.get('/',users.getUsers)

module.exports=router;