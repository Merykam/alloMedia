const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');


router.get('/',userController.getUsers);
router.post('/signup',userController.signup);
router.post('/signin',userController.signin);
router.get('/signout',userController.signout);
router.get('/activate/:token',userController.verifyEmail);
router.get('/hello',(req, res)=>{
    res.send("helloooo user")

});

module.exports=router;