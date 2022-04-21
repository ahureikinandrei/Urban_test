import { NextFunction, Request, Response } from 'express';
import ApiError from '../../error/ApiError';

const errorHandleMiddleware = (
    err: TypeError | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        next();
        return res.status(err.status).json({ message: err.message });
    }
    next();
    return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandleMiddleware;
