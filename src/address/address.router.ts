import Router from 'express';
import addressController from './address.controller';
import cashAddressMiddleware from '../cash/cash.middleware';

const router = Router();

router.get('/', cashAddressMiddleware, addressController.get);

export default router;
