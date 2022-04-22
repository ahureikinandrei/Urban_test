import Router from 'express';
import addressController from './address.controller';

const router = Router();

router.get('/', addressController.get);
router.post('/', addressController.post);
router.put('/', addressController.put);
router.delete('/', addressController.delete);

export default router;
