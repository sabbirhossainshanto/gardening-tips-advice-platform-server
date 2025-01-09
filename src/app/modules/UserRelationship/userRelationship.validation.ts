import { z } from 'zod';
import {
  FriendRequestStatus,
  Relationship_Type,
} from './userRelationship.constant';

export const createRelationship = z.object({
  body: z.object({
    user: z.string(),
    targetUser: z.string(),
    relationshipType: z.enum(
      Object.keys(Relationship_Type) as [keyof typeof Relationship_Type]
    ),
    friendRequestStatus: z
      .enum(
        Object.keys(FriendRequestStatus) as [keyof typeof FriendRequestStatus]
      )
      .optional(),
    isFollowing: z.boolean().default(false),
    isFollower: z.boolean().default(false),
  }),
});

export const relationshipValidation = {
  createRelationship,
};
