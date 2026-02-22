/**
 * Standardized Response Format
 */
export const sendResponse = (res, statusCode, success, message, data = null) => {
    return res.status(statusCode).json({
        success,
        message,
        data,
    });
};

export const sendError = (res, statusCode, message) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};
