const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0DNA92ph94__WyBrS2vcK9reygyZthryawLZMzI0&s"
    }
})

const Book = mongoose.model('BOOK', bookSchema);

module.exports = Book;