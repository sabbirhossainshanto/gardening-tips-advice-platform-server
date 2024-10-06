import express from 'express';

import { USER_ROLE } from '../User/user.constant';
import { ProfileController } from './profile.controller';

import auth from '../../middlewares/auth';
import { postController } from '../Post/post.controller';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ProfileController.getMyProfile
);

router.put(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ProfileController.updateMyProfile
);

router.get(
  '/get-my-post',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  postController.getUserPost
);

export const ProfileRoutes = router;
