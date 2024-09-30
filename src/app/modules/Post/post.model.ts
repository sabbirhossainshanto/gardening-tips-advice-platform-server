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
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
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
