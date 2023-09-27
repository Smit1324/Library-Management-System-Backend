const express = require('express')
const router = express.Router();

const admin = require('../middleware/admin');
const bookControllers = require('../controllers/book');

router.post('/addbooks', admin, bookControllers.addBook);
router.delete('/deletebook/:id', admin, bookControllers.deleteBook)
router.get('/', bookControllers.getAllBooks)
router.get('/:id', bookControllers.getBook)
// router.get('/?bookName', bookControllers.searchBook)

module.exports = router;