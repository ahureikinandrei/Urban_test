import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';
import nominatimService from '../locationProviders/nominatim/nominatim.service';
import { Params, ReqBody, ReqQuery, ResBody } from './address.types';
import { isString } from '../utils/types';

class AddressController {
    async get(
        req: Request<Params, ResBody, ReqBody, ReqQuery>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { address } = req.query;
            if (!isString(address)) {
                next(ApiError.badRequest('Invalid address'));
                return;
            }

            const searchResult =
                await nominatimService.getCoordinatesByQueryString(address);

            res.json(searchResult);
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
