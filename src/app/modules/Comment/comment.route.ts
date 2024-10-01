import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { commentController } from './comment.controller';
import { commentValidation } from './comment.validation';

const router = express.Router();

export const UserRoutes = router;

router.post(
  '/add-comment',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(commentValidation.createCommentValidationSchema),
  commentController.createComment
);
router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),

  commentController.getAllComment
);
router.get(
  '/:commentId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),

  commentController.getSingleComment
);

router.put(
  '/edit-comment/:commentId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),

  commentController.editComment
);

router.delete(
  '/:commentId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),

  commentController.deleteComment
);

export const commentRoutes = router;
