import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
import { postRoutes } from '../modules/Post/post.route';
import { followRoutes } from '../modules/Follow/follow.route';
import { commentRoutes } from '../modules/Comment/comment.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },

  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/posts',
    route: postRoutes,
  },
  {
    path: '/follow',
    route: followRoutes,
  },
  {
    path: '/comments',
    route: commentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
