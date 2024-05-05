import createError from 'http-errors';
import {
  createAssignment,
  createCalendarEvent,
  uploadExamination,
  createStudent,
  uploadResult,
  getTeacherData,
  deleteEventByTitle,
  updateAssignmentById,
  deleteAssignmentById,
  updateExaminationById,
  deleteExaminationById,
  updateResultbyId,
  deleteResultsById,
  updateStudentById,
  deleteStudentById,
  markAttendance,
  getClassData,
  UpdateMiscellaneousInfo,
} from '../services/teacher.service.js';

export const getClassTData = async (request, response, next) => {
  const { classId } = request.params;
  const clsId = Number(classId);
  const classAssigned = request.classAssigned;

  try {
    //to authenticate user
    
    const checkAccess = classAssigned.includes(clsId);
   
    if (!checkAccess) throw createError.Forbidden();

    const getData = await getTeacherData(clsId);
    if (!getData) throw createError.Forbidden();
    response.send(getData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export async function addStudentInfo(request, response, next) {
  const { classId } = request.params;
  console.log('params', classId);
  const data = request.body;
  const clsId = Number(classId);

  try {
    const addStudent = await createStudent(clsId, data);
    if (!addStudent) throw createError.InternalServerError();
    response.send({ message: 'Student information was added successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function updateStudent(request, response, next) {
  const { classId } = request.params;
  const data = request.body;
  const { id } = request.params;
  const clsId = Number(classId);
  try {
    const result = await updateStudentById(clsId, id, data);
    if (!result) throw createError.InternalServerError();
    response.send({ message: 'Student Info updated successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function deleteStudent(request, response, next) {
  const { classId } = request.params;
  const data = request.body;
  const { id } = request.params;
  const clsId = Number(classId);
  try {
    const result = await deleteStudentById(clsId, id, data);
    if (!result) throw createError.InternalServerError();
    response.send({ message: 'Student Info deleted successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function addAssignment(request, response, next) {
  const { classId } = request.params;
  const data = request.body;
  const clsId = Number(classId);
  try {
    const addStudent = await createAssignment(clsId, data);
    if (!addStudent) throw createError.InternalServerError();
    response.send({ message: 'Assignment uploaded successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function updateAssignment(request, response, next) {
  const { classId } = request.params;
  const data = request.body;
  const { id } = request.params;
  const clsId = Number(classId);
  try {
    const result = await updateAssignmentById(clsId, id, data);
    if (!result) throw createError.InternalServerError();
    response.send({ message: 'Assignment updated successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function deleteAssignment(request, response, next) {
  const { classId } = request.params;
  const data = request.body;
  const { id } = request.params;
  const clsId = Number(classId);
  try {
    const result = await deleteAssignmentById(clsId, id, data);
    if (!result) throw createError.InternalServerError();
    response.send({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function addEvent(request, response, next) {
  const { classId } = request.params;
  const data = request.body;
  const clsId = Number(classId);
  try {
    const addCalendarEvent = await createCalendarEvent(clsId, data);
    if (!addCalendarEvent) throw createError.InternalServerError();
    response.send({ message: 'Event added successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function deleteCalendarEvent(request, response, next) {
  const { classId } = request.params;
  const { title } = request.body;
  try {
    const deleteEvent = await deleteEventByTitle({
      classId: Number(classId),
      title: title,
    });
    // console.log('delete',deleteEvent);
    if (!deleteEvent) throw createError.InternalServerError();
    response.send({ message: 'Event deleted successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function addExamination(request, response, next) {
  const { classId } = request.params;
  const data = request.body;
  const clsId = Number(classId);
  try {
    const addExam = await uploadExamination(clsId, data);
    if (!addExam) throw createError.InternalServerError();
    response.send({ message: 'Examination uploaded successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function updateExamination(request, response, next) {
  const { classId } = request.params;
  const data = request.body;
  const { id } = request.params;
  const clsId = Number(classId);
  try {
    const result = await updateExaminationById(clsId, id, data);
    if (!result) throw createError.InternalServerError();
    response.send({ message: 'Examination updated successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function deleteExamination(request, response, next) {
  const { classId } = request.params;
  const { id } = request.params;
  const clsId = Number(classId);
  try {
    const result = await deleteExaminationById(clsId, id);
    if (!result) throw createError.InternalServerError();
    response.send({ message: 'Examination deleted successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function addResults(request, response, next) {
  const { classId } = request.params;
  const { examType } = request.body;
  const data = request.body;
  const clsId = Number(classId);
  try {
    const getData = await getClassData(clsId);
    // Checking if result already exists
    const dataExists = getData[0]?.results?.some(
      (obj) => obj.examType === examType
    );
    if (dataExists) {
      throw createError.Forbidden('Result already exists');
    } else {
      const addResults = await uploadResult(clsId, data);
      if (!addResults) throw createError.InternalServerError();
      response.send({ message: 'Results uploaded successfully' });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function updateResults(request, response, next) {
  const { classId } = request.params;
  const data = request.body;
  const { id } = request.params;
  const clsId = Number(classId);
  try {
    const result = await updateResultbyId(clsId, id, data);
    if (!result) throw createError.InternalServerError();
    response.send({ message: 'Examination updated successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function deleteResults(request, response, next) {
  const { classId } = request.params;
  const { id } = request.params;
  const clsId = Number(classId);
  try {
    const result = await deleteResultsById(clsId, id);
    if (!result) throw createError.InternalServerError();
    response.send({ message: 'Examination deleted successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function addAttendance(request, response, next) {
  const { classId } = request.params;
  const data = request.body;
  const date = data.date;
  const clsId = Number(classId);
  try {
    // Getting data from DB
    const getData = await getClassData(clsId);
    // Checking if attendance is already taken
    const dateExists = getData?.some((obj) =>
      obj?.attendance?.some((item) => item?.date === date)
    );
    if (dateExists) {
      throw createError.Forbidden('Attendance already taken for the day');
    } else {
      const attendance = await markAttendance(clsId, data);
      if (!attendance) throw createError.InternalServerError();
      response.send({ message: 'Attendance is marked for the day' });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function addMiscellaneousInfo(request, response, next) {
  const { classId } = request.params;
  const data = request.body;
  const clsId = Number(classId);
  try {
    const result = await UpdateMiscellaneousInfo(clsId, data);
    if (!result) throw createError.InternalServerError();
    response.send({ message: 'Progress Updated successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
