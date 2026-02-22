import Book from '../models/Book.js';
import { sendResponse, sendError } from '../utils/responseHandler.js';

// @desc    Get all books
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find().populate('user', 'name email');
        sendResponse(res, 200, true, 'Books fetched successfully', books);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
export const getBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id).populate('user', 'name email');

        if (!book) {
            return sendError(res, 404, 'Book not found');
        }

        sendResponse(res, 200, true, 'Book fetched successfully', book);
    } catch (error) {
        next(error);
    }
};

// @desc    Create book
// @route   POST /api/books
// @access  Private
export const createBook = async (req, res, next) => {
    try {
        const { title, author, genre, price, inStock } = req.body;

        const book = await Book.create({
            title,
            author,
            genre,
            price,
            inStock,
            user: req.user.id,
        });

        sendResponse(res, 201, true, 'Book created successfully', book);
    } catch (error) {
        next(error);
    }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private
export const updateBook = async (req, res, next) => {
    try {
        let book = await Book.findById(req.params.id);

        if (!book) {
            return sendError(res, 404, 'Book not found');
        }

        // Make sure user is book owner
        if (book.user.toString() !== req.user.id) {
            return sendError(res, 401, 'User not authorized to update this book');
        }

        book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        sendResponse(res, 200, true, 'Book updated successfully', book);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private
export const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return sendError(res, 404, 'Book not found');
        }

        // Make sure user is book owner
        if (book.user.toString() !== req.user.id) {
            return sendError(res, 401, 'User not authorized to delete this book');
        }

        await book.deleteOne();

        sendResponse(res, 200, true, 'Book removed successfully');
    } catch (error) {
        next(error);
    }
};
