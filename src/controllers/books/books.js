const { getAllBooks, getBookByID } = require("../../domain/books/books")
const newID = require("../../functions/createID")
const { deletedBooks } = require('../../../data/deletedData.js')

let newBook = {
    id: 0,
    title: 'string',
    type: 'string',
    author: 'string'
}

const getBooks = (req, res) => {
    res.status(200).json({
        books: getAllBooks()
    })
}

const addBook = (req, res) => {
    newBook.id = newID(getAllBooks())
    newBook.title = req.body.title
    newBook.type = req.body.type
    newBook.author = req.body.author

    getAllBooks().push(newBook)
    res.status(201).json({
        books: newBook
    })
}

const getByID = (req, res) => {
    const id = Number(req.params.id)
    const found = getBookByID(id)

    res.status(200).json({
        book: found
    })
}

const removeBook = (req, res) => {
    const id = Number(req.params.id)
    const found = getBookByID(id)

    deletedBooks.push(found)
    const index = getAllBooks().indexOf(found)
    getAllBooks().splice(index, 1)
    res.status(200).json({
        book: found
    })
}

module.exports = {
    getBooks,
    addBook,
    getByID,
    removeBook
}