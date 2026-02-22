import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendResponse, sendError } from '../utils/responseHandler.js';

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return sendError(res, 400, 'User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        const token = generateToken(user._id);

        sendResponse(res, 201, true, 'User registered successfully', {
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);

            sendResponse(res, 200, true, 'Login successful', {
                _id: user._id,
                name: user.name,
                email: user.email,
                token,
            });
        } else {
            sendError(res, 401, 'Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
