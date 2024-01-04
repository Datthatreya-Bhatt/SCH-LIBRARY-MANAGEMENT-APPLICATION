const express = require('express');

const user = require('../controller/user');
const auth = require('../middleware/auth');
const admin = require('../controller/admin');

const router = express.Router();

//to get user page
router.get('/user', user.getUser)


//to get books data
router.get('/user/book', auth.auth, user.getBook);

//to borrow book
router.post('/user/borrow', auth.auth, user.borrowBook);




//to get borrowed book section page
router.get('/user/borrow/page', user.getBorrowedBookPage);


//to see borrowed book
router.get('/user/borrow/book', auth.auth, user.getBorrowedBookData);


//to return book
router.post('/user/return', auth.auth, user.retrunBook);


//to get edit profile page
router.get('/edit', admin.getEdit);

//to edit admin profile
router.post('/edit', auth.auth, admin.editProfile);



module.exports = router;