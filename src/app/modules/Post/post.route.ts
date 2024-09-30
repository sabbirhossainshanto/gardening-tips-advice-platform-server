import express from 'express';
import { postController } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
import { postValidation } from './post.validation';

const router = express.Router();

export const UserRoutes = router;

router.post(
  '/create-post',
  validateRequest(postValidation.createPostValidationSchema),
  postController.createPost
);
router.put('/vote', postController.updatePostVote);
router.get('/:email', postController.getUserPost);

export const postRoutes = router;
