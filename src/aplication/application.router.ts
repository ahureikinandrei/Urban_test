import Router from 'express';
import applicationController from './application.controller';

const router = Router();

router.get('/', applicationController.get);
router.post('/', applicationController.post);
router.put('/', applicationController.put);
router.delete('/', applicationController.delete);

export default router;
