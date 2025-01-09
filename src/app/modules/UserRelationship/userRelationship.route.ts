import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { relationshipValidation } from './userRelationship.validation';
import { relationshipController } from './userRelationship.controller';

const router = express.Router();

router.post(
  '/create-relationship',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(relationshipValidation.createRelationship),
  relationshipController.createRelationship
);
router.get(
  '/followers',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  relationshipController.getMyFollowers
);
router.get(
  '/followings',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  relationshipController.getMyFollowing
);
router.delete(
  '/unfollow/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  relationshipController.unFollowUser
);

router.get(
  '/pending-friend',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  relationshipController.getPendingFriendRequest
);

export const userRelationshipRoutes = router;
