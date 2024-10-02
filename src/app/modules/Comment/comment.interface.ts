import { Types } from 'mongoose';

export interface IComment {
  comment: string;
  post: Types.ObjectId;
  user: Types.ObjectId;
  postUser: Types.ObjectId;
}
