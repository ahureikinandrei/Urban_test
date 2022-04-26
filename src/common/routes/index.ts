import { Router } from 'express';
import addressRouter from '../../address/address.router';

const router = Router();

router.use('/address', addressRouter);

export default router;
