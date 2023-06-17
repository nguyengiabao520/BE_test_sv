import { ObjectId } from 'mongodb';
import { client } from '../index.js';

export async function registerUser(data) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('UserData')
      .insertOne(data);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByEmail(email) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('UserData')
      .findOne({ email: email });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByUsername(username) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('UserData')
      .findOne({ username: username });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(_id) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('UserData')
      .findOne({ _id: new ObjectId(_id) });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function resetPasswordById({ _id, password: hashedPassword }) {
  try {
    const result = await client
      .db('Dashboard')
      .collection('UserData')
      .updateOne(
        { _id: new ObjectId(_id) },
        { $set: { password: hashedPassword } }
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}
