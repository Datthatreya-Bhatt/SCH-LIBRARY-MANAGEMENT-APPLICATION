const path = require('path');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
require('dotenv').config();





//For showing role page
exports.getRole = (req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname,'../','view','role.html'));
};


