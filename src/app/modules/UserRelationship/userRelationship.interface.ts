import { Types } from 'mongoose';
import {
  FriendRequestStatus,
  Relationship_Type,
} from './userRelationship.constant';

export interface IUserRelationship {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  targetUserId: Types.ObjectId;
  relationshipType: keyof typeof Relationship_Type;
  friendRequestStatus?: keyof typeof FriendRequestStatus;
  isFollowing: boolean;
  isFollower: boolean;
}
