import { Types } from 'mongoose';

export interface IVerifyProfile {
  user: Types.ObjectId;
  date: Date;
  amount: number;
  isDeleted?: boolean;
  transactionId?: string;
  isPaid: boolean;
}
