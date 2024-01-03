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

    try{
        let {email, password, role} = req.body;
        role = role === 'admin';

        if(email.length > 0 && email.includes('@') && password.length > 0){
            
            let find = await User.findOne({
                where: {
                    email: email,
                    isadmin: role
                }
            });

            if(find){
                
                let hash = await bcrypt.compare(password, find.password);

                if(hash){

                    let id = find.id;
                    let token = jwt.sign({id:id},process.env.JWT_S_KEY);
    
                    res.send({msg: 'success', token: token});

                }
                else{
                    res.send({msg: 'wrong password'});
                }


            }
            else{
                res.send({msg: 'wrong cred'});
            }



        }
        else{
            res.send({msg: 'login error'});
            console.trace('login error');
        }


    }catch(err){
        console.trace(err);
        res.send({msg: err});

    }
}
