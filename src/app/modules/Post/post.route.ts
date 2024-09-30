import express from 'express';
import { postController } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
import { postValidation } from './post.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

export const UserRoutes = router;

router.post(
  '/create-post',
  validateRequest(postValidation.createPostValidationSchema),
  postController.createPost
);
router.put('/vote', postController.updatePostVote);
router.get(
  '/get-my-post',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  postController.getUserPost
);

export const postRoutes = router;
