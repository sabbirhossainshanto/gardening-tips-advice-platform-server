import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { paymentService } from './payment.service';

const makePayment = catchAsync(async (req, res) => {
  const { transactionId, status } = req.query;
  const result = await paymentService.makePayment(
    transactionId as string,
    status as string
  );
  res.send(result);
});

const getAllPayment = catchAsync(async (req, res) => {
  const result = await paymentService.getAllPayment();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment history retrieved  successfully',
    data: result,
  });
});

export const paymentController = {
  makePayment,
  getAllPayment,
};
