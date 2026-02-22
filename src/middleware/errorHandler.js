import { sendError } from '../utils/responseHandler.js';

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    if (process.env.NODE_ENV === 'development') {
        console.error(err);
    }

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        return sendError(res, 404, message);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        return sendError(res, 400, message);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        return sendError(res, 400, message.join(', '));
    }

    sendError(res, error.statusCode || 500, error.message || 'Server Error');
};

export default errorHandler;
