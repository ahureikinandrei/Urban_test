import Router from 'express';
import addressController from './address.controller';
import cashAddressMiddleware from '../cash/cash.middleware';

const router = Router();

router.get('/', cashAddressMiddleware, addressController.get);
router.post('/', addressController.post);
router.put('/', addressController.put);
router.delete('/', addressController.delete);

export default router;
