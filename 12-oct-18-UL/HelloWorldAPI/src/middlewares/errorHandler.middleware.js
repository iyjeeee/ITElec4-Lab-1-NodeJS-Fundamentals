// src/middlewares/errorHandler.middleware.js
import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    // Log unexpected errors for debugging while keeping response clean
    if (statusCode === 500) {
        console.error(err);
    }

    return res.status(statusCode).json({
        success: false,
        message: message,
    });
};


