import { client } from '../index.js';

export async function getTeacherData(clsId) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .findOne({ classId: clsId });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function createStudent(clsId, data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: clsId }, { $push: { studentInfo: data } });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function updateStudentById(clsId, id, data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne(
        { classId: clsId, 'studentInfo.id': id },
        { $set: { 'studentInfo.$': data } }
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteStudentById(clsId, id) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: clsId }, { $pull: { studentInfo: { id: id } } });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function createAssignment(clsId, data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: clsId }, { $push: { assignments: data } });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function updateAssignmentById(clsId, id, data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne(
        { classId: clsId, 'assignments.id': id },
        { $set: { 'assignments.$': data } }
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAssignmentById(clsId, id) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: clsId }, { $pull: { assignments: { id: id } } });
    return result;
  } catch (error) {
    console.log(error);
  }
}
export async function createCalendarEvent(clsId, data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: clsId }, { $push: { events: data } });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteEventByTitle({ classId: classId, title: title }) {
  console.log('title', title);
  console.log('classId', classId);
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: classId }, { $pull: { events: { title: title } } });
  } catch (error) {
    console.log(error);
  }
}

export async function uploadExamination(clsId, data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: clsId }, { $push: { examinations: data } });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function updateExaminationById(clsId, id, data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne(
        { classId: clsId, 'examinations.id': id },
        { $set: { 'examinations.$': data } }
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteExaminationById(clsId, id) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: clsId }, { $pull: { examinations: { id: id } } });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadResult(clsId, data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: clsId }, { $push: { results: data } });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function updateResultbyId(clsId, id, data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne(
        { classId: clsId, 'results.id': id },
        { $set: { 'results.$': data } }
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteResultsById(clsId, id) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: clsId }, { $pull: { results: { id: id } } });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getClassData(clsId) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .find({ classId: clsId })
      .toArray();
    return result;
  } catch (error) {
    console.log(error);
  }
}
export async function markAttendance(clsId, data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: clsId }, { $push: { attendance: data } });
    return result;
  } catch (error) {
    console.log(error);
  }
}
export async function UpdateMiscellaneousInfo(clsId, data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: clsId }, { $set: { miscellaneousInfo: data } });
    return result;
  } catch (error) {
    console.log(error);
  }
}
