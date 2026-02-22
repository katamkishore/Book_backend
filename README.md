# Book Catalog API

A modular and secure Node.js backend for managing a book catalog, built with Express and MongoDB.

## Features

- **Authentication**: JWT-based login and registration with password hashing (bcrypt).
- **Security**: 
  - Helmet for secure headers.
  - Express Rate Limit to prevent abuse.
  - CORS support.
  - Environment variable protection.
- **Validation**: Middleware-based input validation using `express-validator`.
- **Error Handling**: Global error handling middleware with standardized JSON responses.
- **CRUD Operations**: Complete CRUD for books with ownership protection.

## Folder Structure

```text
src/
├── config/       # Database connection
├── controllers/  # Route logic
├── middleware/   # Auth, validation, error handler
├── models/       # Mongoose schemas
├── routes/       # API endpoints
├── utils/        # Shared helpers (response handler)
├── app.js        # Express configuration
└── server.js     # Entry point
```

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and get JWT token

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create a book (Private)
- `PUT /api/books/:id` - Update a book (Private/Owner only)
- `DELETE /api/books/:id` - Delete a book (Private/Owner only)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   JWT_EXPIRE=24h
   ```
3. Run in development:
   ```bash
   npm run dev
   ```
4. Start for production:
   ```bash
   npm start
   ```

## Submission Instructions
- Create a document with the GitHub repository link and deployment link.
- Upload through the submission form.
