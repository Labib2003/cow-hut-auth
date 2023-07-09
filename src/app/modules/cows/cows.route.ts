import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CowValidation } from './cows.validation';
import { CowController } from './cows.controller';
import { ENUM_USER_ROLE } from '../../../enums/users';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-cow',
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getAllCows
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getSingleCow
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);

router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

export const CowRoutes = router;
