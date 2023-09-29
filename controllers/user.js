const bcrypt = require('bcryptjs')

const User = require('../models/user');
const Book = require('../models/book');

const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const user = new User({ name, email, password })
        const newUser = await user.save();
        res.status(201).send(newUser)

    } catch (error) {
        console.log(error);
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: "Fill all the credentials" })
    }

    try {

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(404).send({ error: "User not found" })
        }
        else {

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(412).send({ error: "Invalid Credentials" })
            }
            else {

                const token = await user.generateAuthToken();
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 604800),
                    httpOnly: true
                });
                return res.status(200).send({ id: user._id, token })

            }

        }

    } catch (error) {
        console.log(error);
    }
}

const signOut = (req, res) => {
    res.clearCookie("jwt", { path: '/' })
    res.status(200).send({ message: "Logout Successful" })
}

const getAllUsers = async (req, res) => {
    try {

        const users = await User.find({ isAdmin: false });
        res.status(200).send({ users });

    } catch (error) {
        console.log(error);
    }
}

const getSingleUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);
        res.status(200).send({ user });

    } catch (error) {
        console.log(error);
    }
}

const issueBook = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (user.books.length >= 5) return res.status(404).send({ error: "You cannot issue more than 5 books" })

        const book = await Book.findById(req.params.id)
        if (!book) return res.status(404).send({ error: "Book doesn't exist" })

        if (user.books.indexOf(book._id) !== -1) return res.status(404).send({ error: "You already issued this book" })

        user.books.push(book._id);
        await user.save();

        return res.status(200).send({ message: "Book issued successfully" })

    } catch (error) {
        console.log(error);
    }
}

const returnBook = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        user.books.splice(user.books.indexOf(req.params.id), 1);
        await user.save();

        return res.status(200).send({ message: "Book returned successfully" })

    } catch (error) {
        console.log(error);
    }
}

module.exports = { signUp, signIn, signOut, getAllUsers, getSingleUser, issueBook, returnBook };