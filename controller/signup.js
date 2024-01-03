const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();

const sequelize = require('../model/sequelize');
const {User} = require('../model/database'); 





//For showing role page
exports.getSignup = (req,res,next)=>{

    res.status(200).sendFile(path.join(__dirname,'../','view','signup.html'));
};


exports.postSignup = async(req, res, next)=>{
    let t;
    try{
        t = await sequelize.transaction();
        let {name, email, password} = req.body;


        if(name.length > 0 && email.length > 0 && email.includes('@') && password.length > 0){
            
            let find = await User.findOne({
                attribute: ['email'],
                where:{
                    email: email
                }
            })

            if(find){
                res.send({msg: 'User error'});
            }
            else{

                
                
                let hash = await bcrypt.hash(password, Number(process.env.salt));


                let data = await User.create({
                    name: name,
                    email: email,
                    password: hash,
                    isadmin: false
                })
                res.send({msg: 'Signup success'});
                await t.commit();

            }
        }
        else{

            res.send({msg: 'cred error'});

        }


    }catch(err){
        await t.rollback();
        console.trace(err);
        res.send(err);

    }
}