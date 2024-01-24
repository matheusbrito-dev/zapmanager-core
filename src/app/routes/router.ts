import { Router } from 'express';
import userRoutes from './userRoutes/user.route';
import authRoutes from './auth/auth.routes';

const router = Router();

router.use(userRoutes);
router.use(authRoutes);

export default router;
