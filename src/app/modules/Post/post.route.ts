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
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(postValidation.createPostValidationSchema),
  postController.createPost
);

router.put(
  '/vote',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  postController.updatePostVote
);

router.put(
  '/bookmark',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  postController.bookmarkFavoritePost
);
router.get('/', postController.getAllPost);
router.get('/:postId', postController.getSinglePost);
router.get('/user/:userId', postController.getSingleUserPosts);
router.get(
  '/users/upvoters',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  postController.getUpvotersForMyPosts
);

router.get(
  '/get-my-post',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  postController.getUserPost
);
router.delete(
  '/:postId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  postController.deletePost
);
router.put(
  '/update-post/:postId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(postValidation.updatePostValidationSchema),
  postController.updateSinglePost
);

export const postRoutes = router;
