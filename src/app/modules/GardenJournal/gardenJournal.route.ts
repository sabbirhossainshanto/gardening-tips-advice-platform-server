import { Router } from 'express';
import { gardenJournalController } from './gardenJournal.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { gardenJournalValidation } from './gardenJournal.validation';

const router = Router();

router.post(
  '/create-garden-journal',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  validateRequest(gardenJournalValidation.createGardenJournalValidationSchema),
  gardenJournalController.createGardenJournal
);

router.get('/', gardenJournalController.getAllGardenJournal);
router.get('/:gardenId', gardenJournalController.getAllGardenJournal);
router.get(
  '/get-my-garden-journal',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  gardenJournalController.getMyAllGardenJournal
);
router.put(
  '/:gardenId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  gardenJournalController.updateSingleGardenJournal
);
router.delete(
  '/:gardenId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  gardenJournalController.deleteSingleGardenJournal
);

export const gardenJournalRoutes = router;
