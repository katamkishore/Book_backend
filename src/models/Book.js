import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a book title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    author: {
        type: String,
        required: [true, 'Please add an author'],
        trim: true,
    },
    genre: {
        type: String,
        required: [true, 'Please add a genre'],
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Book', bookSchema);
