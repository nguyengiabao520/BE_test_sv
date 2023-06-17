import express from 'express';
import { authValidation } from '../middleware/authValidation.js';
import { verifyRoles } from '../middleware/verifyRoles.js';
import { ROLES_LIST } from '../config/roles_list.js';
import {
  AddStaffData,
  addData,
  deleteStaff,
  deleteUsers,
  getDashDatabyClass,
  getData,
  getUsers,
  updateStaffData,
  updateTimetable,
  updateUsers,
} from '../controller/admin.controller.js';

const router = express.Router();

router.use(authValidation);
router.use(verifyRoles(ROLES_LIST.Admin));

// Dashboard
router.get('/', getData);
router.post('/', addData);
router.get('/users', getUsers);
router.put('/users', updateUsers);
router.delete('/users', deleteUsers);
router.get('/:classId', getDashDatabyClass);
router.put('/:classId/timetable', updateTimetable);

router.post('/:classId/staff/add-new', AddStaffData);
router.put('/:classId/staffdata/:id/update', updateStaffData);
router.delete('/:classId/staffdata/:id/delete', deleteStaff);

export default router;
