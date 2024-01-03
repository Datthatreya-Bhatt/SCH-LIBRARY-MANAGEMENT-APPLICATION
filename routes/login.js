const express = require('express');

const login = require('../controller/login');

const router = express.Router();

router.get('/login',login.getLogin);
router.post('/login',login.postLogin);


module.exports = router;