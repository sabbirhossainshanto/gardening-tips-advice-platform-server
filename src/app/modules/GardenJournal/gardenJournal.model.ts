import { Schema, model } from 'mongoose';
import { IGardenJournal } from './gardenJournal.interface';

const gardenJournalSchema = new Schema<IGardenJournal>(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

export const GardenJournal = model<IGardenJournal>(
  'GardenJournal',
  gardenJournalSchema
);
