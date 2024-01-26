import express from 'express';
import * as AuthController from '../../controllers/auth.controller';
const router = express.Router();

router.post('/auth/signin', AuthController.signIn);
router.post('/auth/signout', AuthController.signOut);

export default router;
