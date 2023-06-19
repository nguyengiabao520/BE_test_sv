import express from 'express';
import { authValidation } from '../middleware/authValidation.js';
import { verifyRoles } from '../middleware/verifyRoles.js';
import { ROLES_LIST } from '../config/roles_list.js';
import { getClassSData } from '../controller/student.controller.js';

const router = express.Router();

router.use(authValidation);
router.use(verifyRoles(ROLES_LIST.Student));
// Dashboard
router.get('/:classId', getClassSData);

export default router;
