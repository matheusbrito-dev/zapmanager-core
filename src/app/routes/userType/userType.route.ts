import express from 'express';
import * as UserTypeController from '../../controllers/userType.controller';
const router = express.Router();

router.get('/usertype', UserTypeController.findAll);

router.post('/usertype/create', UserTypeController.createUserType);

router.put('/usertype/update/:id', UserTypeController.updateUserType);

router.delete('/usertype/delete/:id', UserTypeController.deleteUserType);

export default router;
