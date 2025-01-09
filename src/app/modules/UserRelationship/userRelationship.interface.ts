import { Types } from 'mongoose';
import {
  FriendRequestStatus,
  Relationship_Type,
} from './userRelationship.constant';

export interface IUserRelationship {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  targetUser: Types.ObjectId;
  relationshipType: keyof typeof Relationship_Type;
  friendRequestStatus?: keyof typeof FriendRequestStatus;
  isFollowing: boolean;
  isFollower: boolean;
}
