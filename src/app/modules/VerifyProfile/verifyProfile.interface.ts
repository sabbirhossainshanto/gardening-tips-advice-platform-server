import { Types } from 'mongoose';

export interface IVerifyProfile {
  user: Types.ObjectId;
  date: string;
  amount: number;
  isDeleted?: boolean;
  transactionId?: string;
}
