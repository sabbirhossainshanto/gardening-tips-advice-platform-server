import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { relationshipValidation } from './userRelationship.validation';
import { relationshipController } from './userRelationship.controller';

const router = express.Router();

router.put(
  '/create-relationship',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(relationshipValidation.createRelationship),
  relationshipController.createRelationship
);

export const userRelationshipRoutes = router;
