import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IVerifyProfile } from './verifyProfile.interface';
import { VerifyProfile } from './verifyProfile.model';
import { User } from '../User/user.model';
import mongoose from 'mongoose';
import { initiatePayment } from '../payment/payment.utils';

const verifyProfile = async (payload: IVerifyProfile) => {
  const isUserExist = await User.findById(payload.user);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  const transactionId = `TXN-${Date.now()}`;

  const paymentData = {
    transactionId,
    amount: payload.amount,
    customerName: isUserExist.name,
    customerMobileNo: isUserExist.mobileNumber,
    customerEmail: isUserExist.email,
  };
  payload.transactionId = transactionId;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    await VerifyProfile.create([payload], { session });
    await session.commitTransaction();
    await session.endSession();
  } catch (error: unknown) {
    await session.abortTransaction();
    await session.endSession();
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  const paymentSession = await initiatePayment(paymentData);
  return paymentSession;
};

export const verifyProfileService = {
  verifyProfile,
};
