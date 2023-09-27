const Book = require('../models/book');

const addBook = async (req, res) => {
    const { name, author, genre } = req.body;

    if (!name || !author || !genre) {
        return res.status(400).send({ error: "Fill all the credentials" })
    }

    try {

        const book = await Book.findOne({ name: name })

        if (!book) {

            const newBook = new Book({ name, author, genre })
            await newBook.save();
            return res.status(201).send({ message: "Added Successfully" })

        }
        else {
            return res.status(404).send({ error: "Book already exists" })
        }

    } catch (error) {
        console.log(error)
    }
}

const deleteBook = async (req, res) => {
    try {

        await Book.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: "Book deleted Successfully" });

    } catch (error) {
        console.log(error)
    }
}

const getAllBooks = async (req, res) => {
    try {

        const books = await Book.find();
        res.status(200).send({ books });

    } catch (error) {
        console.log(error);
    }
}

const getBook = async (req, res) => {
    try {

        const book = await Book.findById(req.params.id);
        res.status(200).send({ book });

    } catch (error) {
        console.log(error);
    }
}

const searchBook = async (req, res) => {
    const { name } = req.query.bookName;

    try {

        const book = await Book.findOne({ name });
        res.status(200).send({ message:"HEllo" });

    } catch (error) {
        console.log(error);
    }
}

module.exports = { addBook, deleteBook, getAllBooks, getBook, searchBook };