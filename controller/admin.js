const path = require('path');
require('dotenv').config();


const sequelize = require('../model/sequelize');
const {User, Book} = require('../model/database');





//For showing role page
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
                name: book
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
        let id = req.userID;

        let check = await User.findOne({
            where: {
                id: id,
                isadmin: true
            }
        });

        if(check){
            let data = await Book.create({
                name: book
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

exports.getTransaction = (req, res, next)=>{
    res.status(200).sendFile(path.join(__dirname,'../','view','transaction.html'));
}

exports.seeTransaction = async(req, res, next)=>{

};

exports.getSetLimitPage = (req, res, next)=>{
    res.status(200).sendFile(path.join(__dirname,'../','view','limit.html'));
}

exports.setLimit = async(req, res, next)=>{

};