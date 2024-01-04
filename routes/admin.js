const express = require('express');

const auth = require('../middleware/auth');
const admin = require('../controller/admin');

const router = express.Router();

//to get admin page
router.get('/admin', admin.getAdmin);

// to add books to library
router.post('/admin/book', auth.auth, admin.addBook);

// to get the list of the books in library
router.get('/admin/book', auth.auth, admin.getBooks);

//to delete a book in library
router.delete('/admin/:id', auth.auth, admin.removeBook);

//to edit a book in library
router.post('/admin/edit', auth.auth, admin.updateBook);


//to get edit admin profile page
router.get('/edit', admin.getEdit);

//to edit admin profile
router.post('/edit', auth.auth, admin.editProfile);


//to see transactions page
router.get('/admin/transaction', admin.getTransaction);


//to get transactions data
router.get('/admin/transaction/data', auth.auth, admin.seeTransaction);

//to get transactions detail page
router.get('/admin/transaction/detail', admin.getDetail);

//to get transaction detail of a user
router.post('/admin/transaction', auth.auth, admin.getUserTransaction);



//to get setLimit for borrowing page
router.get('/admin/limit', admin.getSetLimitPage);

//to set limit for borrowing
router.post('/admin/limit', auth.auth, admin.setLimit);


module.exports = router;