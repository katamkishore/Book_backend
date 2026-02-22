import express from 'express';
import {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
} from '../controllers/bookController.js';
import { protect } from '../middleware/auth.js';
import { bookValidation } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', protect, bookValidation, createBook);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

export default router;
