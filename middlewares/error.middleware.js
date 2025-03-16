/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
export const errorMiddleware = (err, req, res, next) => {
    console.error('\x1b[31m%s\x1b[0m', `[ERROR] ${err.stack || err}`);

    let statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    // Default error response
    const errorResponse = {
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    };

    // Handle specific error types
    if (err.name === 'ValidationError') {
        errorResponse.error.message = Object.values(err.errors)
            .map(val => val.message)
            .join(', ');
        errorResponse.error.details = err.errors;
        statusCode = 400;
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        errorResponse.error.message = 'Unauthorized - Invalid Token';
        statusCode = 401;
    }

    // Send error response
    res.status(statusCode).json(errorResponse);
};
