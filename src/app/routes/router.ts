import { Router } from 'express';
import userRoutes from './userRoutes/user.route';
import authRoutes from './auth/auth.routes';
// import { validateAccess } from '../middlewares/validateAccess/validateAccess';

const router = Router();

router.use(authRoutes);
router.use(userRoutes);

export default router;
