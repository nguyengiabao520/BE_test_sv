import createError from 'http-errors';
import { getStudentData } from '../services/student.service.js';

export const getClassSData = async (request, response, next) => {
  const classId = request.classAssigned[0];
  try {
    const getData = await getStudentData(classId);
    if (!getData) throw createError.Forbidden();
    response.send(getData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
