const express = require('express');

const error = require('../controller/error');

const router = express.Router();

router.use(error.getError);


module.exports = router;