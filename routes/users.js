const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');



router.post('/signup',userController.signup);
router.post('/signin',userController.signin);
router.get('/signout',userController.signout);
router.get('/activate/:token',userController.verifyEmail);
router.post('/forgotPassword',userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);

module.exports=router;