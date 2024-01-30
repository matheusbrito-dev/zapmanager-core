import { Router } from 'express';
import userRoutes from './user/user.route';
import authRoutes from './auth/auth.routes';
import userTypeRoutes from './userType/userType.route';

// import { validateAccess } from '../middlewares/validateAccess/validateAccess';

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(userTypeRoutes);

export default router;
