import express from 'express';
import { paymentController } from './payment.controller';

const router = express.Router();
router.post('/', paymentController.confirmationPayment);

export const paymentRoute = router;
