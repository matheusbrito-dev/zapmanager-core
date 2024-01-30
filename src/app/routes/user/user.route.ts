import express from 'express';
import * as UserController from '../../controllers/user.controller';
import { tokenAcess } from '../../middlewares/tokenAcess/tokenAcess.middleware';
const router = express.Router();

router.get('/users', tokenAcess, UserController.findAll);

router.get('/users/:id', UserController.findUserById);

router.post('/users/create', UserController.createUser);

router.put('/users/update/:id', UserController.updateUser);

router.delete('/users/delete/:id', UserController.deleteUser);

export default router;
