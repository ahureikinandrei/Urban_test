import { NextFunction, Request, Response } from 'express';
import cashService from './cash.service';
import { isString } from '../utils/types';
import {
    CashedResultBody,
    Params,
    ReqBody,
    ReqQuery,
    ResBody,
} from './cash.types';

const cashAddressMiddleware = async (
    req: Request<Params, ResBody, ReqBody, ReqQuery>,
    res: Response<CashedResultBody>,
    next: NextFunction
) => {
    try {
        const { address } = req.query;
        if (isString(address) && cashService.isAvailable) {
            const data = await cashService.get(address);
            if (data !== null) {
                const cashedResponse = JSON.parse(data);
                res.json(cashedResponse);
                return;
            }
        }

        next();
    } catch {
        next();
    }
};

export default cashAddressMiddleware;
