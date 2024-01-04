const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();


const sequelize = require('../model/sequelize');
const {User, Book, Ledger} = require('../model/database');





//For showing page
exports.getAdmin = (req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname,'../','view','admin.html'));
};


exports.getBooks = async(req, res, next)=>{
    try{

        let id = req.userID;

        let check = await User.findOne({
            where: {
                id: id,
                isadmin: true
            }
        })

        if(check){
            let data = await Book.findAll();
            res.send(data);
        }
        else{
            res.send({msg: 'You are not admin'});
        }

        

    }catch(err){
        res.send(err);
        console.trace(err);
    }
};

exports.addBook = async(req, res, next)=>{
    let t;
    try{

        t = await sequelize.transaction();
        let {book} = req.body;
        let id = req.userID;

        let check = await User.findOne({
            where: {
                id: id,
                isadmin: true
            }
        });

        if(check){
            let data = await Book.create({
                name: book,
                available: true
            }, {transaction: t});

            await t.commit();

            res.send( data);
        }
        else{
            res.send({msg: 'No authority'});
        }



    }catch(err){
        await t.rollback();
        console.trace(err);
        res.send({msg: err});
    }
};



exports.updateBook = async(req, res, next)=>{
    let t;
    try{

        t = await sequelize.transaction();
        let {book_id, book} = req.body;
        let id = req.userID;
        book_id = Number(book_id);

        let check = await User.findOne({
            where: {
                id: id,
                isadmin: true
            }
        });

        if(check){
            let data = await Book.update({
                name: book
            }, 
            {
                where: {
                    id: book_id
                }

            }, {transaction: t});

            await t.commit();

            res.send({msg: data, abc: '446454'});
        }
        else{
            res.send({msg: 'No authority'});
        }



    }catch(err){
        await t.rollback();
        console.trace(err);
        res.send({msg: err});
    }
};




exports.removeBook = async(req, res, next)=>{
    let t;
    try{

        t = await sequelize.transaction();
        let book_id = Number(req.params.id);
        let id = req.userID;


        console.trace(book_id);
        let check = await User.findOne({
            where: {
                id: id,
                isadmin: true
            }
        });

        if(check){
            let data = await Book.destroy({
                where:{
                    id: book_id
                },
                transaction: t
            });

            await t.commit();

            res.send({msg: data});
        }
        else{
            res.send({msg: 'No authority'});
        }



    }catch(err){
        await t.rollback();
        console.trace(err);
        res.send({msg: err});
    }
};

exports.getEdit = (req, res, next)=>{
    res.status(200).sendFile(path.join(__dirname,'../','view','edit.html'));
}

exports.editProfile = async(req, res, next)=>{
    let t;
    try{

        t = await sequelize.transaction();
        let {name, email, password} = req.body;
        let id = req.userID;

        let check = await User.findOne({
            where: {
                id: id,
            }
        });

        if(check && name.length > 0 && email.length > 0 && email.includes('@') && password.length > 0){

            let hash = await bcrypt.hash(password, Number(process.env.SALT));

            let data = await User.update({
                name: name,
                email: email,
                password: hash
            },
            {
                where:{
                    id: id
                }
            },
            {transaction: t}
            );

            await t.commit();

            res.send({msg: 'success'});
        }
        else{
            res.send({msg: 'error'});
        }



    }catch(err){
        await t.rollback();
        console.trace(err);
        res.send({msg: err});
    }
};

exports.getTransaction = (req, res, next)=>{
    res.status(200).sendFile(path.join(__dirname,'../','view','transaction.html'));
}

exports.seeTransaction = async(req, res, next)=>{

    try{

        let id = req.userID;

        let user = await User.findOne({
            where: {
                id: id,
                isadmin: true
            }
        })

        if(user){
            let data = await Ledger.findAll();
            res.send(data);
    
        }
        else{
            res.send({msg: "error"});
        }


       
    }catch(err){
        res.send(err);
        console.trace(err);
    }

};


exports.getUserTransaction = async (req, res, next)=>{

    try{
        let id = req.userID;
        let {email} = req.body;

        let check = await User.findOne({
            where: {
                id: id,
                isadmin: true
            }
        })

        if(check){
            let data = await Ledger.findAll({
                where: {
                    email: email
                }
            })

            res.send(data);

        }
        else{
            res.send({msg: "error"});
        }

    }catch(err){
        console.trace(err);
        res.send(err);
    }
}

exports.getSetLimitPage = (req, res, next)=>{
    res.status(200).sendFile(path.join(__dirname,'../','view','setlimit.html'));
}

exports.setLimit = async(req, res, next)=>{
    let t;
    try{

        t = await sequelize.transaction();
        let id = req.userID;
        let {number} = req.body;
        number = Number(number);


        let check = await User.findOne({
            where: {
                id: id,
                isadmin: true
            }
        });

        if(check){
            let data = await User.update({
                limit: number
            },
            {   where: {

            },
                transaction: t
            });

            res.send({msg: 'success'});
            await t.commit();

        }
        else{
            res.send({msg: "No authority"});
        }


    }catch(err){
        console.trace(err);
        res.send(err);
        await t.rollback();
    }

};



exports.getDetail = async(req, res, next)=>{
    res.status(200).sendFile(path.join(__dirname,'../','view','detail.html'));
    
}