import { client } from '../index.js';

export async function getStudentData(classId) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .findOne({ classId: classId });
    return result;
  } catch (error) {
    console.log(error);
  }
}
