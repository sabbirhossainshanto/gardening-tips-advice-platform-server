import { Types } from 'mongoose';

export type TPost = {
  _id?: string;
  title: string;
  description?: string;
  user: Types.ObjectId;
  content?: string;
  imageUrl?: string;
  category: string;
  isPremium: boolean;
  upvotes: Types.ObjectId[];
  downvotes: Types.ObjectId[];
  comments: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

export interface IUpdateVote {
  voteType: 'upvote' | 'downvote';
  userId: Types.ObjectId;
  postId: Types.ObjectId;
}
