import { Types } from 'mongoose';

export interface INewsFeed {
  photo: string;
  user: Types.ObjectId;
}
