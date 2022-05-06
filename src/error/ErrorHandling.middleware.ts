import { NextFunction, Request, Response } from 'express';
import ApiError from './ApiError';
import { HttpStatusCode, INTERNAL_SERVER_ERROR } from '../utils/constants';

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
    return res
        .status(HttpStatusCode.INTERNAL_SERVER)
        .json({ message: INTERNAL_SERVER_ERROR });
};

export default errorHandleMiddleware;
