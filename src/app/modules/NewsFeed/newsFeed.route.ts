import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { fileUploader } from '../../utils/fileUploader';
import { newsFeedController } from './newsFeed.controller';
import parseRequest from '../../utils/parseRequest';

const router = express.Router();

router.post(
  '/add-newsFeed',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  fileUploader.upload.single('file'),
  parseRequest,
  newsFeedController.addNewsFeed
);
router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  newsFeedController.getAllNewsFeed
);
router.get(
  '/:newsFeedId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  newsFeedController.getSingleNewsFeed
);

router.put(
  '/:newsFeedId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),

  newsFeedController.editNewsFeed
);

router.delete(
  '/:newsFeedId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),

  newsFeedController.deleteNewsFeed
);

export const newsFeedRoutes = router;
