import { Types } from 'mongoose';
import { z } from 'zod';
import {
  FriendRequestStatus,
  Relationship_Type,
} from './userRelationship.constant';

export const createRelationship = z.object({
  body: z.object({
    userId: z.instanceof(Types.ObjectId),
    targetUserId: z.instanceof(Types.ObjectId),
    relationshipType: z.enum(
      Object.keys(Relationship_Type) as [keyof typeof Relationship_Type]
    ),
    friendRequestStatus: z
      .enum(
        Object.keys(FriendRequestStatus) as [keyof typeof FriendRequestStatus]
      )
      .optional(),
    isFollowing: z.boolean(),
    isFollower: z.boolean(),
  }),
});

export const relationshipValidation = {
  createRelationship,
};
