import { Schema, model } from 'mongoose';
import { IVerifyProfile } from './verifyProfile.interface';

const verifyProfileSchema = new Schema<IVerifyProfile>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  date: {
    type: Date,
  },

  amount: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
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
