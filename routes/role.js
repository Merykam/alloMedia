const express = require('express');

const router = express.Router();
const roleController = require('../controllers/roleController')

router.post('/insertRole',roleController)

module.exports= router;