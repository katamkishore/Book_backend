import { body, validationResult } from 'express-validator';
import { sendError } from '../utils/responseHandler.js';

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsg = errors.array().map(err => err.msg).join(', ');
        return sendError(res, 400, errorMsg);
    }
    next();
};

export const registerValidation = [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    validateRequest
];

export const loginValidation = [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
    validateRequest
];

export const bookValidation = [
    body('title', 'Title is required').notEmpty(),
    body('author', 'Author is required').notEmpty(),
    body('genre', 'Genre is required').notEmpty(),
    body('price', 'Price must be a number').isNumeric(),
    validateRequest
];
