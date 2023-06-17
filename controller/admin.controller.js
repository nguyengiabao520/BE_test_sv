import createError from 'http-errors';
import {
  AddStaffDataByClsId,
  createAdminData,
  deleteStaffById,
  deleteUserData,
  getAdminData,
  getDashDatabyClsId,
  getUserData,
  updateStaffDataByClsId,
  updateTimetableByClsId,
  updateUserData,
} from '../services/admin.services.js';

export const getData = async (request, response, next) => {
  try {
    const getDashData = await getAdminData();
    if (!getDashData) throw createError.NotFound();
    response.send(getDashData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addData = async (request, response, next) => {
  const data = request.body;
  try {
    const addDashData = await createAdminData(data);
    if (!addDashData) throw createError.InternalServerError();
    response.send('Data Added!');
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUsers = async (request, response, next) => {
  try {
    const getData = await getUserData();
    if (!getData) throw createError.InternalServerError();
    response.send(getData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateUsers = async (request, response, next) => {
  const { email, dashboardAccess, access } = request.body;
  try {
    const updateUser = await updateUserData({ email, dashboardAccess, access });
    if (!updateUser) throw createError.InternalServerError();
    response.send({ message: 'User data updated successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteUsers = async (request, response, next) => {
  const { email } = request.body;
  try {
    const result = await deleteUserData({ email });
    if (!result) throw createError.InternalServerError();
    response.send({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getDashDatabyClass = async (request, response, next) => {
  const { classId } = request.params;
  const clsId = Number(classId);
  try {
    const getData = await getDashDatabyClsId(clsId);
    if (!getData) throw createError.InternalServerError();
    response.send(getData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateTimetable = async (request, response, next) => {
  const { classId } = request.params;
  const data = request.body;
  const clsId = Number(classId);
  console.log(data, clsId);
  try {
    const updateTimetable = await updateTimetableByClsId(clsId, data);
    if (!updateTimetable) throw createError.InternalServerError();
    response.send({ message: 'Data updated successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const AddStaffData = async (request, response, next) => {
  const { classId } = request.params;
  const data = request.body;
  const clsId = Number(classId);
  try {
    const addStaffData = await AddStaffDataByClsId(clsId, data);
    if (!addStaffData) throw createError.InternalServerError();
    response.send({ message: 'Staff added successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateStaffData = async (request, response, next) => {
  const { classId } = request.params;
  const data = request.body;
  const { id } = request.params;
  const clsId = Number(classId);
  try {
    const updateStaffData = await updateStaffDataByClsId(clsId, id, data);
    if (!updateStaffData) throw createError.InternalServerError();
    response.send({ message: 'Data updated successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export async function deleteStaff(request, response, next) {
  const { classId } = request.params;
  const data = request.body;
  const { id } = request.params;
  const clsId = Number(classId);
  try {
    const result = await deleteStaffById(clsId, id, data);
    if (!result) throw createError.InternalServerError();
    response.send({ message: 'Staff Info deleted successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
