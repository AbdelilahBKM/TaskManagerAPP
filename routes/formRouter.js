const express = require('express');
const formController = require('../controllers/formController');
const router = express.Router();

router.get('/', formController.home_page);
router.post('/submitForm', formController.loginRegisterform);

module.exports = router;
