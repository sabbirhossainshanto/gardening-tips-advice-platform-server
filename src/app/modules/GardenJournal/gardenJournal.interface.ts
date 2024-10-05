import { Types } from 'mongoose';

export interface IGardenJournal {
  title: string;
  user: Types.ObjectId;
  content: string;
  image: string;
  isPublic: boolean;
}
