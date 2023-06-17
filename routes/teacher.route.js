import express from 'express';
import { authValidation } from '../middleware/authValidation.js';
import { verifyRoles } from '../middleware/verifyRoles.js';
import { ROLES_LIST } from '../config/roles_list.js';
import {
  addAssignment,
  addStudentInfo,
  getClassTData,
  addEvent,
  addExamination,
  addResults,
  deleteCalendarEvent,
  updateAssignment,
  deleteAssignment,
  updateExamination,
  deleteExamination,
  updateResults,
  deleteResults,
  updateStudent,
  deleteStudent,
  addAttendance,
  addMiscellaneousInfo,
} from '../controller/teacher.controller.js';

const router = express.Router();

router.use(authValidation);
router.use(verifyRoles(ROLES_LIST.Teacher));

// Dashboard
router.get('/:classId', getClassTData);

router.post('/:classId/student/add-new', addStudentInfo);
router.put('/:classId/student/:id/update', updateStudent);
router.delete('/:classId/student/:id/delete', deleteStudent);

router.post('/:classId/assignment/add-new', addAssignment);
router.put('/:classId/assignment/:id/update', updateAssignment);
router.delete('/:classId/assignment/:id/delete', deleteAssignment);

router.post('/:classId/event/add', addEvent);
router.delete('/:classId/event/delete', deleteCalendarEvent);

router.post('/:classId/upload/exam', addExamination);
router.put('/:classId/examination/:id/update', updateExamination);
router.delete('/:classId/examination/:id/delete', deleteExamination);

router.post('/:classId/upload/results', addResults);
router.put('/:classId/results/:id/update', updateResults);
router.delete('/:classId/results/:id/delete', deleteResults);

router.post('/:classId/upload/attendance', addAttendance);

router.post('/:classId/upload/miscellaneous', addMiscellaneousInfo);

export default router;
