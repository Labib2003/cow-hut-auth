import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './users.validation';
import { UserController } from './users.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getUsers);

router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.ADMIN), UserController.getUserById)
  .delete(auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser)
  .patch(
    validateRequest(UserValidation.updateUserZodSchema),
    auth(ENUM_USER_ROLE.ADMIN),
    UserController.updateUser
  );

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.createUser
);

export const UserRoutes = router;
