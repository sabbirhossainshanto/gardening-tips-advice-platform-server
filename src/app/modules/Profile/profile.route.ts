import express from 'express';

import { USER_ROLE } from '../User/user.constant';
import { ProfileController } from './profile.controller';


import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
    '/',
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    ProfileController.getMyProfile
);

router.put(
    '/',
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    ProfileController.updateMyProfile
)

export const ProfileRoutes = router;
