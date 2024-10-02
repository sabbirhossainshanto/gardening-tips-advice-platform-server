import { catchAsync } from '../../utils/catchAsync';
import { paymentService } from './payment.service';

const confirmationPayment = catchAsync(async (req, res) => {
  const { transactionId, status } = req.query;
  const result = await paymentService.confirmationService(
    transactionId as string,
    status as string
  );
  res.send(result);
});

export const paymentController = {
  confirmationPayment,
};
