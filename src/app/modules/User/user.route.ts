import express from 'express';
import { UserControllers } from './user.controller';

import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

export const UserRoutes = router;

router.post(
  '/create-user',
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.userRegister
);
router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserControllers.getAllUsers
);
router.get('/:id', UserControllers.getSingleUser);
router.put('/update-user/:userId', UserControllers.updateUser);
