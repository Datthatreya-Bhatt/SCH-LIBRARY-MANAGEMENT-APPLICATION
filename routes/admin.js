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



//to see transactions in library
router.get('/admin/transaction', admin.getTransaction);




//to set limit for borrowing
router.get('/admin/limit', admin.getSetLimitPage);


module.exports = router;