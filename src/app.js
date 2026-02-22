import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorHandler from './middleware/errorHandler.js';

// Route files
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Set security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 10 minutes'
});
app.use('/api', limiter);

// Mount routers
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

// Base route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Book Catalog API' });
});

// Error handler middleware
app.use(errorHandler);

export default app;
