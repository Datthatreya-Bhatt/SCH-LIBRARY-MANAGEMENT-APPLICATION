const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const sequelize = require('../model/sequelize');
const {User} = require('../model/database');





//For showing role page
exports.getLogin = (req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname,'../','view','login.html'));
};

exports.postLogin = async (req, res, next)=>{
    let t;

    try{
        t = await sequelize.transaction();
        let {email, password, role} = req.body;

        if(email.length > 0 && email.includes('@') && password.length > 0){
            
            let data = await User.findOne({})

        }
        else{
            res.send({msg: 'login error'});
            console.trace('login error');
        }


    }catch(err){
        console.trace(err);

    }
}
