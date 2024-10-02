import { join } from 'path';
import { verifyPayment } from './payment.utils';
import { readFileSync } from 'fs';
import { VerifyProfile } from '../VerifyProfile/verifyProfile.model';
import { User } from '../User/user.model';

const confirmationService = async (transactionId: string, status: string) => {
  let greeting;
  let date = '';
  let verifyUser;

  if (transactionId) {
    verifyUser = await VerifyProfile.findOne({ transactionId });
  }

  const paymentVerifyRes = await verifyPayment(transactionId);
  if (paymentVerifyRes?.pay_status === 'Successful') {
    await User.findOneAndUpdate(
      { _id: verifyUser?.user },
      { isVerified: true, premiumStatus: true }
    );
  }

  const filePath = join(__dirname, '../paymentConfirmation/index.html');
  let template = readFileSync(filePath, 'utf-8');

  if (status === 'success') {
    greeting = 'Welcome ro premium access';
  } else {
    greeting = 'Access failed try again';
  }
  if (verifyUser) {
    date = verifyUser?.date;
  }

  template = template.replace('{{success}}', status);
  template = template.replace('{{greeting}}', greeting);
  template = template.replace('{{transactionId}}', transactionId || '');
  template = template.replace('{{date}}', date);
  return template;
};

export const paymentService = {
  confirmationService,
};
