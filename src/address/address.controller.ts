import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';
import nominatimService from '../locationProviders/nominatim/nominatim.service';
import districtService from '../district/district.service';
import { Location, Params, ReqBody, ReqQuery, ResBody } from './address.types';
import { isString } from '../utils/types';
import addressService from './address.service';

class AddressController {
    async get(
        req: Request<Params, ResBody, ReqBody, ReqQuery>,
        res: Response<ResBody>,
        next: NextFunction
    ) {
        try {
            const { address: search } = req.query;
            if (!isString(search)) {
                next(ApiError.badRequest('Invalid address'));
                return;
            }

            const searchResult =
                await nominatimService.getLocationByQueryString(search);

            if (searchResult) {
                const coordinates =
                    AddressController.getCoordinatesFromLocation(searchResult);

                const servicesNames =
                    await districtService.getNamesServicesForLocation(
                        coordinates
                    );

                const responseBody = addressService.createPositiveResponseBody(
                    search,
                    searchResult,
                    servicesNames
                );

                res.json(responseBody);
                return;
            }

            const notFoundBody =
                addressService.createNotFoundBodyResponseBody();

            res.json(notFoundBody);
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

    static getCoordinatesFromLocation(
        searchResult: Location
    ): [number, number] {
        const { lat, lng } = searchResult;
        return [lng, lat];
    }
}

export default new AddressController();
