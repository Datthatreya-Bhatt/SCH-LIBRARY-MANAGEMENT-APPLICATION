const path = require('path');
require('dotenv').config();


const sequelize = require('../model/sequelize');
const {User, Book, Ledger} = require('../model/database');



//For showing page
exports.getUser = (req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname,'../','view','user.html'));
};


exports.getBook = async(req, res, next)=>{
    try{


        let data = await Book.findAll({
            where: {
                available: true
            }
        })

        res.send(data);




    }catch(err){
        console.trace(err);
        res.send(err);
    }
}



exports.borrowBook = async(req, res, next)=>{
    let t;
    try{
        t = await sequelize.transaction();
        let {book_id, book} = req.body;
        book_id = Number(book_id);
        let id = req.userID;
        // console.trace(id, book_id, book)

        let user = await User.findOne({
            where: {
                id: id
            }
        })



        if(Number(user.borrowed) < Number(user.limit) ){

            
            let add_book = await User.update({
                borrowed: user.borrowed+1
            },{
                where: {
                    id: id
                }
            }
            );

            let data = await Book.update({
                available: false

            }, {
                where: {
                    id: book_id
                }
            },
            {transaction: t}
            );



            let ledger = await Ledger.create({
                book: book,
                email: user.email,
                transaction: 'borrowed',
                bookId: book_id
            })


            res.send('success');



            await t.commit();
        }
        else{
            res.send({msg: "limit reached"});
        }
    }catch(err){
        console.trace(err);
        await t.rollback();
        res.send(err);
    }
}


exports.retrunBook = async(req, res, next)=>{

    try{

        let id = req.userID;
        let {book_id, book} = req.body;
        book_id = Number(book_id);

        console.trace(book_id);
        
        let user = await User.findOne({
            where: {
                id: id
            }
        })

        let user_db = await User.update({
            borrowed: user.borrowed-1
        },{
            where: {
                id: id
            }
        })

        let book_db = await Book.update({
            available: true
        }, {
            where: {
                id: book_id
            }
        })
        let ledger = await Ledger.update({
            transaction: 'returned'
        }, {
            where:{
             
                book: book,
                email: user.email,
                bookId: book_id
            }
                    
        })

        res.send('success');

    }catch(err){
        console.trace(err);
        res.send(err);
    }
};

exports.getBorrowedBookPage = (req, res, next)=>{
    res.status(200).sendFile(path.join(__dirname,'../','view','borrowed.html'));

};

exports.getBorrowedBookData = async(req, res, next)=>{
    try{
        let id = req.userID;

        let user = await User.findOne({
            where: {
                id: id
            }
        })

        let data = await Ledger.findAll({
            where:{
                email: user.email,
                transaction: 'borrowed'

            }
        })

        res.send(data);

    }catch(err){
        console.trace(err);
        res.send(err);
    }
};