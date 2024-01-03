const express = require('express');

const role = require('../controller/role');

const router = express.Router();

router.get('/',role.getRole);
// router.post('/user/signup',user.postData);


module.exports = router;