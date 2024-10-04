import { Schema, model } from 'mongoose';
import { TPost } from './post.interface';

const postSchema = new Schema<TPost>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    content: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    upvotes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    downvotes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: 'Comment',
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

export const Post = model<TPost>('Post', postSchema);
