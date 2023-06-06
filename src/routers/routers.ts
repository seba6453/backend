import express from 'express';
import userRouter from './user';
import pondRouter from './pond';
import reportRouter from './report';

const router = express.Router();

router.use('/user',userRouter);
router.use('/pond',pondRouter);
router.use('/report',reportRouter);

export default router;