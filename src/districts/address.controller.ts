import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';

class AddressController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            res.json('addresses');
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

export default new AddressController();
