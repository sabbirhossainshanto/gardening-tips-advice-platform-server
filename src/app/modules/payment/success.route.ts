import express from 'express';
import { paymentController } from './payment.controller';

const router = express.Router();
router.post('/', paymentController.makePayment);

export const successRoute = router;
