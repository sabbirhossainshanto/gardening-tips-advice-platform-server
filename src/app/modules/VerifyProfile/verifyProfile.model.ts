import { Schema, model } from 'mongoose';
import { IVerifyProfile } from './verifyProfile.interface';

const verifyProfileSchema = new Schema<IVerifyProfile>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  date: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  transactionId: {
    type: String,
  },
});
export const VerifyProfile = model<IVerifyProfile>(
  'VerifyProfile',
  verifyProfileSchema
);
