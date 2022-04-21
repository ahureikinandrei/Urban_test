import { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError';

class ApplicationController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            res.json('get');
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async post(req: Request, res: Response, next: NextFunction) {
        try {
            res.json('post');
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async put(req: Request, res: Response, next: NextFunction) {
        try {
            res.json('put');
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            res.json('delete');
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

export default new ApplicationController();
