import { Schema, model } from 'mongoose';
import { INewsFeed } from './newsFeed.interface';

const newsFeedSchema = new Schema<INewsFeed>(
  {
    photo: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

export const NewsFeed = model<INewsFeed>('NewsFeed', newsFeedSchema);
