const express = require('express');
const authController = require('../Controllers/AuthController');
const router = express.Router();


router.post('/', authController.login);

module.exports = router;