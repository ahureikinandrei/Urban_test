import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';
import districtService from '../district/district.service';
import { Location, Params, ReqBody, ReqQuery, ResBody } from './address.types';
import { isString } from '../utils/types';
import addressService from './address.service';
import cashService from '../cash/cash.service';
import geocodingService from '../geocding/geocoding.service';

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

            const searchResult = await geocodingService.getLocation(search);

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

                await cashService.saveInCashJson(search, responseBody);
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

    static getCoordinatesFromLocation(
        searchResult: Location
    ): [number, number] {
        const { lat, lng } = searchResult;
        return [lng, lat];
    }
}

export default new AddressController();
