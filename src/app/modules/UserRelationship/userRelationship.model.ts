import { Schema, model } from 'mongoose';
import { IUserRelationship } from './userRelationship.interface';
import {
  FriendRequestStatus,
  Relationship_Type,
} from './userRelationship.constant';

const userRelationshipSchema = new Schema<IUserRelationship>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    targetUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    friendRequestStatus: {
      type: String,
      enum: Object.keys(FriendRequestStatus),
      default: FriendRequestStatus.pending,
    },
    relationshipType: {
      type: String,
      enum: Object.keys(Relationship_Type),
      default: Relationship_Type.none,
    },
    isFollower: {
      type: Boolean,
      default: false,
    },
    isFollowing: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

export const UserRelationship = model<IUserRelationship>(
  'UserRelationship',
  userRelationshipSchema
);
