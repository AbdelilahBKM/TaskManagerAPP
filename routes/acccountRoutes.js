const express = require('express');
const router = express.Router();
const userController = require('../controllers/AccountController');
const jwtController = require('../controllers/jwtController');
// require('dotenv').config();
// const body_parser = require('body-parser');
// const cookieParser = require('cookie-parser');

router.get('/', jwtController.cookie_auth, userController.acc_info);

router.get('/logout', userController.acc_logout);

router.delete('/:id', userController.acc_delete);

router.post('/:id', userController.acc_update);

module.exports = router;
