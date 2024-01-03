const express = require('express');

const role = require('../controller/login');

const router = express.Router();

router.get('/login',role.getLogin);
router.post('/login',role.postLogin);


module.exports = router;