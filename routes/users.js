const express = require('express');
const router = express.Router();

const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const userControllers = require('../controllers/user');

// router.post('/reg',userControllers.signUp);
router.post('/login', userControllers.signIn);
router.post('/logout', userControllers.signOut);
router.get('/', admin, userControllers.getAllUsers);
router.get('/:id', auth, userControllers.getSingleUser);
router.put('/issuebook/:id', auth, userControllers.issueBook);
router.put('/returnbook/:id', auth, userControllers.returnBook);

module.exports = router;