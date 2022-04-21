import { Router } from 'express';
import applicationRouter from '../../aplication/application.router';
import addressRouter from '../../districts/address.router';

const router = Router();

router.use('/', applicationRouter);
router.use('/address', addressRouter);

export default router;
