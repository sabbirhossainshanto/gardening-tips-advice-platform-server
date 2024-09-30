import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';
import { followValidationSchema } from './follow.validation';
import validateRequest from '../../middlewares/validateRequest';
import { followController } from './follow.controller';

const router = express.Router();

router.put(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(followValidationSchema),
  followController.followUser
);

export const followRoutes = router;
