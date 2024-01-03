const express = require('express');

const signup = require('../controller/signup');

const router = express.Router();

router.get('/signup', signup.getSignup);
router.post('/signup', signup.postSignup);


module.exports = router;