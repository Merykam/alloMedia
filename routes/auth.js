const express = require('express');

const router = express.Router();

const userController = require('../controllers/authController');

const authenticateJWT= require('../middlewares/auth');





router.post('/signup',userController.signup);
router.post('/signin',userController.signin);
router.get('/signout',authenticateJWT,userController.signout);
router.get('/activate/:token',userController.verifyEmail);
router.post('/forgotPassword',authenticateJWT,userController.forgotPassword);
router.post('/reset-password/:token',authenticateJWT, userController.resetPassword);

module.exports=router;