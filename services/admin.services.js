import { client } from '../index.js';

export async function getAdminData() {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .find({})
      .toArray();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function createAdminData(data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .insertOne(data);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserData() {
  try {
    const result = await client
      .db('Dashboard')
      .collection('UserData')
      .find({})
      .project({ _id: 0, password: 0, username: 0 })
      .toArray();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserData({ email, access, dashboardAccess }) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('UserData')
      .updateOne(
        { email: email },
        { $set: { access: access, dashboardAccess: dashboardAccess } }
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUserData({ email }) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('UserData')
      .deleteOne({ email: email });
    return result;
  } catch (error) {}
}

export async function getDashDatabyClsId(clsId) {
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

export async function updateTimetableByClsId(clsId, data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: clsId }, { $set: { timetable: data } });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function AddStaffDataByClsId(clsId, data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: clsId }, { $push: { staff: data } });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function updateStaffDataByClsId(clsId, id, data) {
  console.log(clsId, id, data);
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne(
        { classId: clsId, 'staff.id': id },
        { $set: { 'staff.$': data } }
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteStaffById(clsId, id) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('ClassData')
      .updateOne({ classId: clsId }, { $pull: { staff: { id: id } } });
    return result;
  } catch (error) {
    console.log(error);
  }
}
