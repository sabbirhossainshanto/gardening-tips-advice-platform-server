import { Types } from 'mongoose';

export type TPost = {
  _id?: string;
  title: string;
  description: string;
  user: Types.ObjectId; //user ID associated with this post
  imageUrls?: string[];
  category: string;
  tags?: string[];
  isPremium: boolean;
  upvotes: Types.ObjectId[];
  downvotes: Types.ObjectId[];
  comments?: string[]; // Array of comment IDs associated with this post
  createdAt: Date;
  updatedAt: Date;
};


export interface IUpdateVote {
    voteType: 'upvote' | 'downvote';
    userId: Types.ObjectId;
    postId: Types.ObjectId;
  }
