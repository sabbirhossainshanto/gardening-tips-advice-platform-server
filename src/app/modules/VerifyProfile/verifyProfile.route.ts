import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { createVerifyProfileValidationSchema } from './verifyProfile.validation';
import { verifyProfileController } from './verifyProfile.controller';

const router = express.Router();
router.post(
  '/',
  auth(USER_ROLE.USER),
  validateRequest(createVerifyProfileValidationSchema),
  verifyProfileController.verifyProfile
);

export const verifyProfileRoute = router;
